"""
Export Cleaned and Processed Dataset Sample + HTML Summary Report
"""
import os
import sys
import pandas as pd
import numpy as np

sys.path.append(os.path.dirname(__file__))
from preprocessing import engineer_features, get_feature_sets

RAW_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "application_train.csv")
PROCESSED_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "results")

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

def export_clean_data(sample_size=10000):
    print(f"[+] Loading raw dataset from {RAW_PATH} ...")
    df_raw = pd.read_csv(RAW_PATH)
    
    print("[+] Applying feature engineering & cleaning pipeline...")
    df_clean = engineer_features(df_raw)

    # 1. Export Clean Sample CSV (Easy to open in Excel / VS Code)
    sample_csv_path = os.path.join(PROCESSED_DIR, "cleaned_features_sample.csv")
    sample_df = df_clean.sample(n=min(sample_size, len(df_clean)), random_state=42)
    sample_df.to_csv(sample_csv_path, index=False)
    print(f"[+] Saved {len(sample_df):,} sample records to: {sample_csv_path}")

    # 2. Export Feature Summary Table
    feature_summary = []
    feature_sets = get_feature_sets()
    
    trad_cols = set(feature_sets['traditional']['num'] + feature_sets['traditional']['cat'])
    alt_cols = set(feature_sets['alternative']['num'] + feature_sets['alternative']['cat'])

    for col in df_clean.columns:
        if col in ['TARGET', 'SK_ID_CURR', 'IS_THIN_FILE']:
            cat_label = "Target / Meta"
        elif col in alt_cols:
            cat_label = "Alternative / Behavioral"
        elif col in trad_cols:
            cat_label = "Traditional Credit"
        else:
            cat_label = "Other Raw Feature"

        missing_pct = df_clean[col].isna().mean() * 100
        dtype_str = str(df_clean[col].dtype)
        unique_cnt = df_clean[col].nunique()
        sample_val = str(df_clean[col].dropna().iloc[0]) if not df_clean[col].dropna().empty else "N/A"

        feature_summary.append({
            'Feature Name': col,
            'Category': cat_label,
            'Data Type': dtype_str,
            'Unique Values': unique_cnt,
            'Missing %': f"{missing_pct:.2f}%",
            'Example Value': sample_val[:30]
        })

    df_feat_summary = pd.DataFrame(feature_summary)
    summary_csv_path = os.path.join(PROCESSED_DIR, "feature_summary_dictionary.csv")
    df_feat_summary.to_csv(summary_csv_path, index=False)
    print(f"[+] Saved complete feature summary to: {summary_csv_path}")

    return sample_csv_path, summary_csv_path

if __name__ == "__main__":
    export_clean_data()
