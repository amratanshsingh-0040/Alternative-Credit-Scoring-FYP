"""
Data Preprocessing and Feature Pipeline Module
"""
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

TRADITIONAL_NUMERICAL = [
    'AMT_INCOME_TOTAL',
    'AMT_CREDIT',
    'AMT_ANNUITY',
    'AMT_GOODS_PRICE',
    'DAYS_BIRTH',
    'DAYS_EMPLOYED',
    'CNT_CHILDREN',
    'CNT_FAM_MEMBERS',
    'AMT_REQ_CREDIT_BUREAU_MON',
    'AMT_REQ_CREDIT_BUREAU_QRT',
    'AMT_REQ_CREDIT_BUREAU_YEAR',
    'CREDIT_INCOME_PERCENT',
    'ANNUITY_INCOME_PERCENT',
    'CREDIT_TERM',
    'EMPLOYED_TO_AGE_RATIO'
]

TRADITIONAL_CATEGORICAL = [
    'NAME_INCOME_TYPE',
    'NAME_EDUCATION_TYPE',
    'NAME_FAMILY_STATUS',
    'NAME_HOUSING_TYPE'
]

ALTERNATIVE_NUMERICAL = [
    'EXT_SOURCE_1',
    'EXT_SOURCE_2',
    'EXT_SOURCE_3',
    'EXT_SOURCES_MEAN',
    'EXT_SOURCES_STD',
    'DAYS_REGISTRATION',
    'DAYS_ID_PUBLISH',
    'DAYS_LAST_PHONE_CHANGE',
    'HOUR_APPR_PROCESS_START',
    'OBS_30_CNT_SOCIAL_CIRCLE',
    'DEF_30_CNT_SOCIAL_CIRCLE',
    'DEF_30_RATIO',
    'OWN_CAR_AGE'
]

ALTERNATIVE_CATEGORICAL = [
    'FLAG_MOBIL',
    'FLAG_EMP_PHONE',
    'FLAG_WORK_PHONE',
    'FLAG_EMAIL',
    'WEEKDAY_APPR_PROCESS_START',
    'REGION_RATING_CLIENT',
    'ORGANIZATION_TYPE'
]

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Engineer standard and domain-specific ratios."""
    df = df.copy()

    # Handle abnormal DAYS_EMPLOYED (Home Credit has 365243 as an anomalous value for pensioners)
    df['DAYS_EMPLOYED_ANOM'] = df['DAYS_EMPLOYED'] == 365243
    df['DAYS_EMPLOYED'] = df['DAYS_EMPLOYED'].replace(365243, np.nan)

    # Traditional Ratios
    df['CREDIT_INCOME_PERCENT'] = df['AMT_CREDIT'] / (df['AMT_INCOME_TOTAL'] + 1e-5)
    df['ANNUITY_INCOME_PERCENT'] = df['AMT_ANNUITY'] / (df['AMT_INCOME_TOTAL'] + 1e-5)
    df['CREDIT_TERM'] = df['AMT_ANNUITY'] / (df['AMT_CREDIT'] + 1e-5)
    df['EMPLOYED_TO_AGE_RATIO'] = df['DAYS_EMPLOYED'] / (df['DAYS_BIRTH'] + 1e-5)

    # Alternative Ratios
    ext_cols = ['EXT_SOURCE_1', 'EXT_SOURCE_2', 'EXT_SOURCE_3']
    for col in ext_cols:
        if col not in df.columns:
            df[col] = np.nan
    df['EXT_SOURCES_MEAN'] = df[ext_cols].mean(axis=1)
    df['EXT_SOURCES_STD'] = df[ext_cols].std(axis=1).fillna(0)

    if 'OBS_30_CNT_SOCIAL_CIRCLE' in df.columns and 'DEF_30_CNT_SOCIAL_CIRCLE' in df.columns:
        df['DEF_30_RATIO'] = df['DEF_30_CNT_SOCIAL_CIRCLE'] / (df['OBS_30_CNT_SOCIAL_CIRCLE'] + 1)
    else:
        df['DEF_30_RATIO'] = 0

    if 'OWN_CAR_AGE' not in df.columns:
        df['OWN_CAR_AGE'] = np.nan

    # Identify Thin-File
    bureau_col = 'AMT_REQ_CREDIT_BUREAU_YEAR'
    if bureau_col in df.columns:
        df['IS_THIN_FILE'] = (df[bureau_col] == 0) | (df[bureau_col].isna())
    else:
        df['IS_THIN_FILE'] = True

    return df

def build_preprocessor(numerical_cols, categorical_cols):
    """Construct Scikit-Learn ColumnTransformer for automated imputation and scaling."""
    num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    cat_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='constant', fill_value='Missing')),
        ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', num_pipeline, numerical_cols),
            ('cat', cat_pipeline, categorical_cols)
        ],
        remainder='drop'
    )
    return preprocessor

def get_feature_sets():
    """Return feature groupings."""
    trad_num = TRADITIONAL_NUMERICAL
    trad_cat = TRADITIONAL_CATEGORICAL
    
    alt_num = ALTERNATIVE_NUMERICAL
    alt_cat = ALTERNATIVE_CATEGORICAL

    comb_num = list(set(trad_num + alt_num))
    comb_cat = list(set(trad_cat + alt_cat))

    return {
        'traditional': {'num': trad_num, 'cat': trad_cat},
        'alternative': {'num': alt_num, 'cat': alt_cat},
        'combined': {'num': comb_num, 'cat': comb_cat}
    }
