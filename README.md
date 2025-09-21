# GenoPredictX: XGBoost-based Genetic Variant Classifier  

> 🧬 A machine learning pipeline for predicting **disease phenotypes from genetic variants** using **XGBoost** and a **ColumnTransformer** for preprocessing.  

---

## 📌 Overview  
Genetic variants play a critical role in determining disease phenotypes. This project builds a **multi-class classifier** that maps genomic variant features to their associated **disease phenotype**.  

The pipeline:  
- Handles categorical + numerical genomic features using a **ColumnTransformer**.  
- Trains an **XGBoost model** with hyperparameter tuning.  
- Supports **pickle-based deployment** for easy integration into apps or APIs.  
- Currently trained on 4 major phenotype categories:  
  - Cardiovascular phenotype  
  - Hereditary cancer-predisposing syndrome  
  - Inborn genetic diseases  
  - Developmental and epileptic encephalopathy  

---

## ⚙️ Features  
✅ Balanced dataset (~4K variants across 4 diseases)  
✅ Preprocessing with **OneHotEncoder + StandardScaler**  
✅ **GridSearchCV** for hyperparameter tuning  
✅ Pickle model for deployment  
✅ Example inference on unseen variants  

---

## 📂 Project Structure  

GenoPredictX/
│── data/
│ ├── balanced_genetics_dataset.csv # Training dataset
│── notebooks/
│ ├── EDA.ipynb # Exploratory analysis
│ ├── model_training.ipynb # Model training steps
│── src/
│ ├── pipeline.py # ColumnTransformer + XGBoost pipeline
│ ├── utils.py # Helper functions
│── models/
│ ├── xgboost_genetics_model.pkl # Saved model
│── examples/
│ ├── test_examples.csv # Example variants
│── README.md
│── requirements.txt
│── app.py # Optional: Streamlit/FastAPI app


---

## 🚀 Installation  

Clone the repo:  
```bash
git clone https://github.com/AyushAI/GenoPredictX.git
cd GenoPredictX
```
