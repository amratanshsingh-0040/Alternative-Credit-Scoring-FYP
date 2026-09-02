"""
Explainable AI (XAI) Module: SHAP & LIME Interpretability Engine
"""
import os
import joblib
import numpy as np
import pandas as pd
import shap
from lime.lime_tabular import LimeTabularExplainer

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

class ModelExplainer:
    def __init__(self, feature_set='combined', model_name='xgboost'):
        self.feature_set = feature_set
        self.model_name = model_name
        
        # Load Model & Preprocessor
        prep_path = os.path.join(MODELS_DIR, f"preprocessor_{feature_set}.joblib")
        model_path = os.path.join(MODELS_DIR, f"{feature_set}_{model_name}.joblib")
        
        if not os.path.exists(prep_path) or not os.path.exists(model_path):
            raise FileNotFoundError(f"Model or Preprocessor not found for {feature_set}_{model_name}. Please train first.")
            
        self.preprocessor = joblib.load(prep_path)
        self.model = joblib.load(model_path)
        
        self.feature_names = self._get_feature_names()
        self.shap_explainer = None
        self.lime_explainer = None

    def _get_feature_names(self):
        """Retrieve transformed feature names from ColumnTransformer."""
        try:
            return self.preprocessor.get_feature_names_out()
        except Exception:
            return [f"feature_{i}" for i in range(100)]

    def initialize_shap(self, background_data_processed):
        """Initialize SHAP TreeExplainer or Explainer."""
        if 'xgboost' in self.model_name or 'random_forest' in self.model_name:
            self.shap_explainer = shap.TreeExplainer(self.model)
        else:
            self.shap_explainer = shap.LinearExplainer(self.model, background_data_processed)

    def initialize_lime(self, background_data_processed, class_names=['Repaid', 'Default']):
        """Initialize LIME Tabular Explainer."""
        self.lime_explainer = LimeTabularExplainer(
            training_data=background_data_processed,
            feature_names=self.feature_names,
            class_names=class_names,
            mode='classification'
        )

    def explain_instance_shap(self, single_row_processed, top_k=6):
        """Generate SHAP local feature importance for a single applicant."""
        if self.shap_explainer is None:
            self.shap_explainer = shap.TreeExplainer(self.model)
            
        shap_values = self.shap_explainer.shap_values(single_row_processed)
        if isinstance(shap_values, list):
            vals = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
        elif len(shap_values.shape) == 2:
            vals = shap_values[0]
        else:
            vals = shap_values

        importance_df = pd.DataFrame({
            'feature': self.feature_names[:len(vals)],
            'shap_value': vals
        })

        importance_df['abs_importance'] = importance_df['shap_value'].abs()
        importance_df = importance_df.sort_values(by='abs_importance', ascending=False).head(top_k)

        factors = []
        for _, row in importance_df.iterrows():
            factors.append({
                'feature': row['feature'],
                'impact': 'INCREASES_DEFAULT_RISK' if row['shap_value'] > 0 else 'REDUCES_DEFAULT_RISK',
                'importance_score': float(row['shap_value'])
            })
        return factors

    def explain_instance_lime(self, single_row_processed, top_k=6):
        """Generate LIME local explanation for an applicant."""
        if self.lime_explainer is None:
            raise ValueError("LIME Explainer not initialized. Call initialize_lime() first.")
            
        exp = self.lime_explainer.explain_instance(
            data_row=single_row_processed[0],
            predict_fn=self.model.predict_proba,
            num_features=top_k
        )
        return exp.as_list()
