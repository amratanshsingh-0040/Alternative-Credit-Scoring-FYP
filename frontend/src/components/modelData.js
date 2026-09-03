export const MODEL_RESULTS = [
  { modality: 'Traditional', algorithm: 'Logistic Regression', overallAUC: 0.6503, thinFileAUC: 0.6596, overallF1: 0.1993, thinFileF1: 0.2048, precision: 0.1218, recall: 0.5484, time: 1.68 },
  { modality: 'Traditional', algorithm: 'Random Forest',       overallAUC: 0.6711, thinFileAUC: 0.6812, overallF1: 0.2161, thinFileF1: 0.2244, precision: 0.1347, recall: 0.5457, time: 23.24 },
  { modality: 'Traditional', algorithm: 'XGBoost',             overallAUC: 0.6969, thinFileAUC: 0.7046, overallF1: 0.0869, thinFileF1: 0.1128, precision: 0.4429, recall: 0.0482, time: 6.11 },
  { modality: 'Alternative', algorithm: 'Logistic Regression', overallAUC: 0.7297, thinFileAUC: 0.7203, overallF1: 0.2492, thinFileF1: 0.2435, precision: 0.1601, recall: 0.5593, time: 3.83 },
  { modality: 'Alternative', algorithm: 'Random Forest',       overallAUC: 0.7315, thinFileAUC: 0.7245, overallF1: 0.2558, thinFileF1: 0.2489, precision: 0.1664, recall: 0.5524, time: 24.88 },
  { modality: 'Alternative', algorithm: 'XGBoost',             overallAUC: 0.7357, thinFileAUC: 0.7299, overallF1: 0.1920, thinFileF1: 0.1860, precision: 0.3551, recall: 0.1317, time: 9.65 },
  { modality: 'Combined',    algorithm: 'Logistic Regression', overallAUC: 0.7436, thinFileAUC: 0.7397, overallF1: 0.2554, thinFileF1: 0.2545, precision: 0.1652, recall: 0.5607, time: 6.61 },
  { modality: 'Combined',    algorithm: 'Random Forest',       overallAUC: 0.7475, thinFileAUC: 0.7456, overallF1: 0.2660, thinFileF1: 0.2655, precision: 0.1749, recall: 0.5534, time: 32.41 },
  { modality: 'Combined',    algorithm: 'XGBoost',             overallAUC: 0.7614, thinFileAUC: 0.7625, overallF1: 0.2537, thinFileF1: 0.2603, precision: 0.3582, recall: 0.2024, time: 14.73, champion: true },
]

export const MODALITY_COLORS = {
  Traditional: '#6366f1',
  Alternative: '#f59e0b',
  Combined: '#10b981',
}
