# 🧬 GenoPredictX: XGBoost-based Genetic Variant Classifier

> A machine learning pipeline for predicting **disease phenotypes from genetic variants** using **XGBoost** and a **ColumnTransformer** for preprocessing.

---

## 📌 Overview

Genetic variants play a critical role in determining disease phenotypes.  
This project builds a **multi-class classifier** that maps genomic variant features to their associated **disease phenotype**.

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

## 💻 User Interface Preview

The **GenoPredictX UI** provides an intuitive and user-friendly interface where users can:
- Input **genetic variant data** to predict potential diseases  
- View detailed **disease descriptions** after prediction  
- Access **doctor consultation** options for further guidance  

Here’s a glimpse of the interface 👇  

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="UI%20Images/1.jpeg">
    <img src="UI%20Images/1.jpeg" alt="GenoPredictX UI - Input Screen" width="75%" style="border-radius:12px; margin:10px 0;">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="UI%20Images/2.jpeg">
    <img src="UI%20Images/2.jpeg" alt="GenoPredictX UI - Prediction Results" width="75%" style="border-radius:12px; margin:10px 0;">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="UI%20Images/3.jpeg">
    <img src="UI%20Images/3.jpeg" alt="GenoPredictX UI - Doctor Consultation" width="75%" style="border-radius:12px; margin:10px 0;">
  </picture>
</p>

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/AyushAI/GenoPredictX.git
cd GenoPredictX
```
---
---
