import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
from typing import List, Dict
from google import genai
import logging

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("gemini")
logger.setLevel(logging.INFO)

api_key = os.getenv("GEMINI_API_KEY")     
client = None
try:
    if api_key:
        client = genai.Client()
        logger.info("✅ Gemini client successfully configured.")
    else:
        logger.warning("⚠️ GEMINI_API_KEY not found.")
except Exception as e:
    logger.error(f"❌ Error initializing Gemini client: {str(e)}")
    client = None

app = FastAPI()

cors_origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
with open(r"D:\Atharva\GenoPredictX\Backend\xgboost_genetics_model.pkl", "rb") as f:
    model = pickle.load(f)

# Define class labels manually - these are the actual phenotype names
# The model returns indices (0,1,2,3,4) which map to these phenotype names
phenotype_names = [
    "Cardiovascular phenotype",                    # index 0
    "Developmental and epileptic encephalopathy",  # index 1
    "Fanconi anemia",                             # index 2
    "Hereditary cancer-predisposing syndrome",    # index 3
    "Inborn genetic diseases"                     # index 4
]

print("Using phenotype names:", phenotype_names)
print(f"Number of classes: {len(phenotype_names)}")

# Verify model classes (they should be [0,1,2,3,4])
try:
    model_classes = model.named_steps["classifier"].classes_
    print("Model classes found:", model_classes)
    print("Model classes type:", type(model_classes))
except Exception as e:
    print(f"Could not get classes from model: {e}")

# ----------------- Request Schema -----------------
class VariantInput(BaseModel):
    Type: str
    GeneSymbol: str
    HGNC_ID: str
    Assembly: str
    ChromosomeAccession: str
    Chromosome: str
    Cytogenetic: str
    PositionVCF: int
    ReferenceAlleleVCF: str
    AlternateAlleleVCF: str

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    phenotype: str

# ----------------- Routes -----------------
@app.get("/")
async def read_root():
    return {"message": "The API is working"}

@app.post("/predict")
async def predict_variant(data: VariantInput):
    try:
        # Convert request to DataFrame
        df = pd.DataFrame([data.dict()])
        
        # Predict using loaded pipeline - this returns numeric indices
        pred_indices = model.predict(df)
        pred_idx = int(pred_indices[0])  # Convert numpy int to Python int
        
        print(f"Raw prediction index: {pred_idx}")
        print(f"Available phenotype names: {phenotype_names}")
        
        # Map numeric index to actual phenotype name
        if 0 <= pred_idx < len(phenotype_names):
            phenotype_name = phenotype_names[pred_idx]
            print(f"Final phenotype: {phenotype_name}")
            
            return {
                "predicted_phenotype": phenotype_name
            }
        else:
            return {
                "predicted_phenotype": f"Unknown phenotype (index: {pred_idx})"
            }
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return {
            "error": f"Prediction failed: {str(e)}",
            "predicted_phenotype": "Error in prediction"
        }

@app.post("/chat")
async def chat(data: ChatRequest):
    try:
        if client is None:
            return {"error": "Gemini client not configured."}
        
        # Build the conversation history string
        history_str = ""
        for msg in data.messages[:-1]:  # Exclude the last (current) message
            if msg["role"] == "user":
                history_str += f"User: {msg['content']}\n"
            else:
                history_str += f"Assistant: {msg['content']}\n"
        
        current_message = data.messages[-1]["content"]
        
        # System prompt with instructions
        system_prompt = f"""You are a helpful healthcare assistant specialized in genetic variants and phenotypes. 
        The patient's predicted phenotype is: {data.phenotype}. 
        Only answer questions related to healthcare, genetics, and this condition. 
        Provide accurate, empathetic, and informative responses based on general medical knowledge. 
        Always remind users to consult a healthcare professional for personalized advice.
        If the query is not related to healthcare or genetics, respond exactly: 
        "I'm sorry, but I can only assist with healthcare-related questions, particularly regarding genetic conditions."""
        
        # Full prompt
        full_prompt = f"{system_prompt}\n\nPrevious conversation:\n{history_str}\nUser: {current_message}\nAssistant:"
        
        # Generate response
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )
        
        return {"response": response.text}
    
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        return {
            "error": f"Chat failed: {str(e)}"
        }

# Optional: Add an endpoint to get available class labels
@app.get("/class_labels")
async def get_class_labels():
    return {"class_labels": phenotype_names}