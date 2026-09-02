# AI-Powered Alternative Credit Assessment & Loan Matching Platform for Thin-File Borrowers

An end-to-end FinTech research & prototype platform designed to assess credit default risk for thin-file borrowers (first-time applicants, gig workers) using traditional and alternative financial/behavioral data with Machine Learning, Explainable AI (SHAP & LIME), and Responsible AI Fairness auditing (Fairlearn).

---

## 📁 Repository Structure

```text
FYP/
├── ml-service/             # Python FastAPI Machine Learning & XAI Microservice
│   ├── data/
│   │   ├── raw/            # Untouched raw datasets (e.g. Home Credit CSVs)
│   │   └── processed/      # Cleaned and engineered feature datasets
│   ├── notebooks/          # Exploratory Data Analysis & experimental notebooks
│   │   ├── 01_data_analysis.ipynb
│   │   ├── 02_feature_engineering.ipynb
│   │   ├── 03_model_training.ipynb
│   │   ├── 04_model_comparison.ipynb
│   │   └── 05_xai_fairness.ipynb
│   ├── src/                # Core ML modules
│   │   ├── preprocessing.py
│   │   ├── features.py
│   │   ├── train.py
│   │   ├── predict.py
│   │   ├── explainability.py
│   │   ├── fairness.py
│   │   └── loan_matching.py
│   ├── models/             # Serialized trained models (.pkl / .joblib)
│   ├── results/            # Model evaluation metrics, charts, SHAP/LIME plots
│   ├── main.py             # FastAPI entrypoint
│   └── requirements.txt    # Python dependencies
│
├── backend/                # Node.js & Express.js REST API Backend
│   ├── config/             # Database and environment configurations
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth and validation middleware
│   ├── models/             # Database queries / ORM models
│   ├── routes/             # API routes
│   ├── services/           # Business logic & ML microservice connector
│   ├── package.json
│   └── server.js
│
├── frontend/               # React.js SPA Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI Components (Score gauge, factor cards, navbar)
│   │   ├── pages/          # Pages (Assessment form, Dashboard, Marketplace)
│   │   ├── services/       # Axios API client
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── database/               # Database initialization & migrations
│   └── schema.sql          # MySQL database schema
│
├── docs/                   # Documentation & Research Notes
│   ├── feature_dictionary.md
│   └── architecture.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Research & Development Phases

1. **Phase 1:** Dataset exploration, feature dictionary definition (Traditional vs Alternative), and thin-file criteria formulation.
2. **Phase 2:** Data preprocessing, missing value imputation, categorical encoding, and feature scaling.
3. **Phase 3:** Machine Learning benchmarking (3 Datasets × 3 Algorithms = 9 Experiments + Thin-File subpopulation test).
4. **Phase 4:** Explainable AI (SHAP & LIME) and Fairness Auditing (Fairlearn).
5. **Phase 5:** Full-stack integration (FastAPI ML microservice + Node.js/Express API + MySQL + React.js).
6. **Phase 6:** Research paper writing and final presentation documentation.
