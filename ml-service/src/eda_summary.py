"""
EDA & Data Exploration Script for Home Credit Default Risk Dataset
"""
import os
import sys
import pandas as pd
import numpy as np

RAW_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "application_train.csv")

def explore_dataset(filepath=RAW_DATA_PATH):
    if not os.path.exists(filepath):
        print(f"[!] Dataset file not found at: {os.path.abspath(filepath)}")
        print("[!] Please place 'application_train.csv' inside 'ml-service/data/raw/'")
        return None

    print(f"[+] Loading dataset from: {filepath} ...")
    df = pd.read_csv(filepath)
    print(f"[+] Dataset Shape: {df.shape[0]:,} rows × {df.shape[1]} columns")

    # 1. Target Distribution
    target_counts = df['TARGET'].value_counts()
    target_pct = df['TARGET'].value_counts(normalize=True) * 100
    print("\n--- Target Variable Distribution ---")
    for val in target_counts.index:
        label = "Default (1)" if val == 1 else "Non-Default (0)"
        print(f"  {label}: {target_counts[val]:,} ({target_pct[val]:.2f}%)")

    # 2. Thin-File Identification
    bureau_col = 'AMT_REQ_CREDIT_BUREAU_YEAR'
    if bureau_col in df.columns:
        thin_file_mask = (df[bureau_col] == 0) | (df[bureau_col].isna())
        tf_count = thin_file_mask.sum()
        tf_pct = (tf_count / len(df)) * 100
        print(f"\n--- Thin-File Subpopulation Analysis ---")
        print(f"  Thin-File Applicants (bureau inquiries = 0 or missing): {tf_count:,} ({tf_pct:.2f}%)")
        print(f"  Thick-File Applicants: {len(df) - tf_count:,} ({100 - tf_pct:.2f}%)")

        tf_default_rate = df.loc[thin_file_mask, 'TARGET'].mean() * 100
        thick_default_rate = df.loc[~thin_file_mask, 'TARGET'].mean() * 100
        print(f"  Default Rate in Thin-File Segment: {tf_default_rate:.2f}%")
        print(f"  Default Rate in Thick-File Segment: {thick_default_rate:.2f}%")

    return df

if __name__ == "__main__":
    explore_dataset()
