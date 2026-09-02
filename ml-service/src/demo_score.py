"""
Interactive Demo Script: Test the Trained Credit Scoring & SHAP Engine
"""
import os
import sys
import joblib
import pandas as pd
import numpy as np

sys.path.append(os.path.dirname(__file__))
from preprocessing import engineer_features
from explainability import ModelExplainer

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "application_train.csv")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

def run_demo():
    print("\n" + "=" * 75)
    print("  AI-POWERED ALTERNATIVE CREDIT SCORING PLATFORM - LIVE DEMO")
    print("=" * 75)

    # 1. Load Champion Model & Preprocessor
    model_path = os.path.join(MODELS_DIR, "combined_xgboost.joblib")
    prep_path = os.path.join(MODELS_DIR, "preprocessor_combined.joblib")

    if not os.path.exists(model_path):
        print("[!] Model not found. Run train.py first.")
        return

    model = joblib.load(model_path)
    preprocessor = joblib.load(prep_path)

    # 2. Pick a Sample Thin-File Applicant from the Dataset
    df_raw = pd.read_csv(DATA_PATH, nrows=5000)
    df_eng = engineer_features(df_raw)
    
    # Filter for thin-file applicants (bureau inquiries = 0 or missing)
    thin_applicants = df_eng[df_eng['IS_THIN_FILE'] == True]
    sample_applicant = thin_applicants.iloc[0:1]

    # Preprocess
    X_proc = preprocessor.transform(sample_applicant)

    # 3. Predict Default Probability
    default_prob = float(model.predict_proba(X_proc)[0, 1])

    # 4. Compute Provisional Alternative Credit Score (Range: 300 to 900)
    credit_score = int(round(900 - (default_prob * 600)))
    credit_score = max(300, min(900, credit_score))

    if credit_score >= 750:
        risk_tier = "LOW RISK (Prime)"
    elif credit_score >= 620:
        risk_tier = "MEDIUM RISK (Near-Prime)"
    else:
        risk_tier = "HIGH RISK (Sub-Prime)"

    # 5. Print Applicant Summary
    income = float(sample_applicant['AMT_INCOME_TOTAL'].iloc[0])
    credit_amt = float(sample_applicant['AMT_CREDIT'].iloc[0])
    annuity = float(sample_applicant['AMT_ANNUITY'].iloc[0])
    age = int(round(-sample_applicant['DAYS_BIRTH'].iloc[0] / 365.25))

    print("\n[+] APPLICANT PROFILE (Thin-File Segment):")
    print(f"  * Age:                     {age} years")
    print(f"  * Annual Income:           ${income:,.2f}")
    print(f"  * Requested Loan Amount:   ${credit_amt:,.2f}")
    print(f"  * Monthly Annuity:         ${annuity:,.2f}")
    print(f"  * Credit Bureau History:   NONE (Thin-File / First-time borrower)")
    print(f"  * External Score 2:        {sample_applicant['EXT_SOURCE_2'].iloc[0]:.4f}")
    print(f"  * External Score 3:        {sample_applicant['EXT_SOURCE_3'].iloc[0]:.4f}")

    print("\n[+] AI ASSESSMENT OUTPUT:")
    print(f"  * Predicted Default Risk:  {default_prob * 100:.2f}%")
    print(f"  * Provisional Credit Score: {credit_score} / 900")
    print(f"  * Risk Classification:     {risk_tier}")

    # 6. SHAP Factor Explanation
    print("\n[+] EXPLAINABLE AI (XAI) - TOP CONTRIBUTING FACTORS (SHAP):")
    try:
        explainer = ModelExplainer(feature_set='combined', model_name='xgboost')
        factors = explainer.explain_instance_shap(X_proc, top_k=5)
        for i, f in enumerate(factors, 1):
            arrow = "[+] REDUCES RISK" if f['impact'] == 'REDUCES_DEFAULT_RISK' else "[-] INCREASES RISK"
            print(f"  {i}. {f['feature']:<38} {arrow:<18} (SHAP Value: {f['importance_score']:+.4f})")
    except Exception as e:
        print(f"  (SHAP factor breakdown initialized: {e})")

    # 7. Mock Loan Matching
    print("\n[+] MATCHED LOAN PRODUCTS:")
    if credit_score >= 620:
        print("  -> Product A: Starter Micro-Credit (Up to $15,000 @ 11.5% APR) - [HIGH MATCH]")
        print("  -> Product B: Peer-to-Peer Community Loan (Up to $25,000 @ 13.0% APR) - [ELIGIBLE]")
    else:
        print("  -> Product C: Credit-Builder Secured Loan (Up to $5,000 @ 16.0% APR) - [CONDITIONAL]")

    print("\n" + "=" * 75 + "\n")

if __name__ == "__main__":
    run_demo()
