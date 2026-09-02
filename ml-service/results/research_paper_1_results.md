# Research Paper 1: Benchmark Experimental Results

## 1. Experimental Summary Table

| Feature Set   | Model               |   Overall ROC-AUC |   Thin-File ROC-AUC |   Overall F1 |   Thin-File F1 |   Training Time (s) |
|:--------------|:--------------------|------------------:|--------------------:|-------------:|---------------:|--------------------:|
| Traditional   | Logistic Regression |            0.6503 |              0.6596 |       0.1993 |         0.2048 |                1.68 |
| Traditional   | Random Forest       |            0.6711 |              0.6812 |       0.2161 |         0.2244 |               23.24 |
| Traditional   | XGBoost             |            0.6969 |              0.7046 |       0.0869 |         0.1128 |                6.11 |
| Alternative   | Logistic Regression |            0.7297 |              0.7203 |       0.2492 |         0.2435 |                3.83 |
| Alternative   | Random Forest       |            0.7315 |              0.7245 |       0.2558 |         0.2489 |               24.88 |
| Alternative   | XGBoost             |            0.7357 |              0.7299 |       0.192  |         0.186  |                9.65 |
| Combined      | Logistic Regression |            0.7436 |              0.7397 |       0.2554 |         0.2545 |                6.61 |
| Combined      | Random Forest       |            0.7475 |              0.7456 |       0.266  |         0.2655 |               32.41 |
| Combined      | XGBoost             |            0.7614 |              0.7625 |       0.2537 |         0.2603 |               14.73 |

## 2. Key Findings & Research Insights
- **Top Overall Model:** XGBoost on Combined Features (ROC-AUC: 0.7614)
- **Top Thin-File Model:** XGBoost on Combined Features (ROC-AUC: 0.7625)
- **Alternative Data Impact:** Demonstrates the value of non-traditional behavioral data in lifting discriminative power for borrowers with zero credit inquiries.
