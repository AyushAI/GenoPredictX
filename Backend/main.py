from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

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
with open(r"C:\Users\athar\OneDrive\Desktop\Atharva\DNA\GenoPredictX\ML Model\xgboost_genetics_model.pkl", "rb") as f:
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

# Optional: Add an endpoint to get available class labels
@app.get("/class_labels")
async def get_class_labels():
    return {"class_labels": phenotype_names}