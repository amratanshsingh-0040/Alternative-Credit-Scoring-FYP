# Feature Dictionary & Categorization Strategy

## 1. Overview
In this project, we address the credit exclusion of **thin-file borrowers** by evaluating three distinct feature configurations:
- **Set A (Traditional):** Conventional financial capacity, employment stability, and standard credit inquiries.
- **Set B (Alternative / Behavioral):** Application behaviors, contactability, digital presence, social risk indicators, and external surrogate scores.
- **Set C (Combined):** Traditional + Alternative features combined.

---

## 2. Target Variable
| Column Name | Type | Description | Values |
|---|---|---|---|
| `TARGET` | Binary | Target indicator of loan default / payment difficulties | `1`: Client had payment difficulties (default)<br>`0`: Client repaid loan on time |

---

## 3. Traditional Feature Set (Set A)
These features reflect standard banking credit appraisal factors (income, debt-to-income indicators, demographic stability, employment duration, and existing credit bureau history).

| Feature Name | Type | Rationale / Credit Meaning |
|---|---|---|
| `AMT_INCOME_TOTAL` | Numerical | Total annual income of the applicant |
| `AMT_CREDIT` | Numerical | Credit amount of the current loan application |
| `AMT_ANNUITY` | Numerical | Loan annuity (monthly repayment amount) |
| `AMT_GOODS_PRICE` | Numerical | Price of goods for consumer loans |
| `NAME_INCOME_TYPE` | Categorical | Working, Commercial associate, State servant, Pensioner, etc. |
| `NAME_EDUCATION_TYPE` | Categorical | Academic qualification level |
| `NAME_FAMILY_STATUS` | Categorical | Marital status and family dependents |
| `DAYS_EMPLOYED` | Numerical | How many days before the application the person started current employment |
| `DAYS_BIRTH` | Numerical | Client's age in days at the time of application |
| `CNT_CHILDREN` | Numerical | Number of children the client has |
| `CNT_FAM_MEMBERS` | Numerical | Total family members in household |
| `AMT_REQ_CREDIT_BUREAU_MON` | Numerical | Number of bureau inquiries in last month |
| `AMT_REQ_CREDIT_BUREAU_QRT` | Numerical | Number of bureau inquiries in last quarter |
| `AMT_REQ_CREDIT_BUREAU_YEAR`| Numerical | Number of bureau inquiries in last year |

---

## 4. Alternative / Behavioral Feature Set (Set B)
These features represent behavioral proxies, application metadata, device stability, and non-traditional signals that substitute for credit bureau history.

| Feature Name | Type | Rationale / Alternative Meaning |
|---|---|---|
| `EXT_SOURCE_1` | Numerical | Normalized alternative external score / data source 1 |
| `EXT_SOURCE_2` | Numerical | Normalized alternative external score / data source 2 |
| `EXT_SOURCE_3` | Numerical | Normalized alternative external score / data source 3 |
| `DAYS_REGISTRATION` | Numerical | Days before application client changed registration (address stability proxy) |
| `DAYS_ID_PUBLISH` | Numerical | Days before application client changed national identity document |
| `DAYS_LAST_PHONE_CHANGE` | Numerical | Days before application client changed their phone number (stability proxy) |
| `FLAG_MOBIL` | Binary | Mobile phone reachable indicator |
| `FLAG_EMP_PHONE` | Binary | Employer phone provided indicator |
| `FLAG_WORK_PHONE` | Binary | Work phone reachable indicator |
| `FLAG_EMAIL` | Binary | Email address provided (digital footprint proxy) |
| `HOUR_APPR_PROCESS_START`| Numerical | Hour of day when loan application was submitted (behavioral pattern) |
| `WEEKDAY_APPR_PROCESS_START` | Categorical | Day of week application was submitted |
| `OBS_30_CNT_SOCIAL_CIRCLE` | Numerical | Number of client's social contacts observed in default window |
| `DEF_30_CNT_SOCIAL_CIRCLE` | Numerical | Number of client's social contacts defaulted within 30 days |
| `REGION_RATING_CLIENT` | Categorical | Rating of the region where client lives |
| `ORGANIZATION_TYPE` | Categorical | Industry sector of employer (business risk proxy) |
| `OWN_CAR_AGE` | Numerical | Age of client's car (asset quality proxy) |

---

## 5. Thin-File Borrower Mathematical Definition

In credit risk research, a **thin-file borrower** is defined as an applicant with **little to no observable credit bureau track record**.

### Identification Rule in Home Credit:
An applicant $i$ is classified as **Thin-File** ($TF_i = 1$) if:

$$\text{ThinFile}_i = \begin{cases} 1 & \text{if } \text{AMT\_REQ\_CREDIT\_BUREAU\_YEAR} = 0 \lor \text{AMT\_REQ\_CREDIT\_BUREAU\_YEAR is NaN} \\ 0 & \text{otherwise} \end{cases}$$

### Experimental Hypothesis:
1. On the **Full Population**, Combined Features will achieve comparable or slightly superior ROC-AUC to Traditional Features.
2. On the **Thin-File Subpopulation**, Traditional Features will experience a severe drop in discriminative ability (ROC-AUC / F1), whereas **Alternative and Combined Features will demonstrate a significant, statistically measurable improvement**.
