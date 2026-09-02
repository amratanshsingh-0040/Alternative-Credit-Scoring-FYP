-- Database Schema for Alternative Credit Assessment & Loan Matching Platform

CREATE DATABASE IF NOT EXISTS `credit_scoring_db`;
USE `credit_scoring_db`;

-- 1. Users Table (Authentication)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('borrower', 'admin', 'lender') DEFAULT 'borrower',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Applicants Profile Table
CREATE TABLE IF NOT EXISTS `applicants` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `age` INT NOT NULL,
    `gender` VARCHAR(20),
    `education_level` VARCHAR(100),
    `marital_status` VARCHAR(50),
    `employment_type` VARCHAR(100),
    `years_employed` DECIMAL(5,2),
    `annual_income` DECIMAL(12,2) NOT NULL,
    `existing_debt_amount` DECIMAL(12,2) DEFAULT 0.00,
    `num_credit_bureau_inquiries` INT DEFAULT 0,
    `is_thin_file` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 3. Assessments Table (ML Inference Output)
CREATE TABLE IF NOT EXISTS `assessments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `applicant_id` INT NOT NULL,
    `model_name` VARCHAR(50) NOT NULL,
    `feature_set_used` ENUM('traditional', 'alternative', 'combined') NOT NULL,
    `default_probability` DECIMAL(5,4) NOT NULL,
    `risk_level` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    `provisional_score` INT NOT NULL, -- e.g., 300 to 900
    `is_fairness_checked` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`) ON DELETE CASCADE
);

-- 4. Explanations Table (SHAP & LIME Feature Contributions)
CREATE TABLE IF NOT EXISTS `explanations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `assessment_id` INT NOT NULL,
    `method` ENUM('SHAP', 'LIME') NOT NULL,
    `feature_name` VARCHAR(100) NOT NULL,
    `feature_value` VARCHAR(100),
    `impact_direction` ENUM('POSITIVE', 'NEGATIVE') NOT NULL,
    `importance_score` DECIMAL(8,5) NOT NULL,
    FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE CASCADE
);

-- 5. Loan Products Table (Lender Offerings)
CREATE TABLE IF NOT EXISTS `loan_products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `lender_name` VARCHAR(150) NOT NULL,
    `product_name` VARCHAR(150) NOT NULL,
    `loan_type` VARCHAR(100) NOT NULL, -- e.g. Micro-loan, Personal, Starter Credit
    `min_amount` DECIMAL(12,2) NOT NULL,
    `max_amount` DECIMAL(12,2) NOT NULL,
    `min_provisional_score` INT NOT NULL,
    `max_allowed_risk` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    `interest_rate_apr` DECIMAL(5,2) NOT NULL,
    `tenure_months` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Loan Matches Table (Applicant Matches with Eligible Products)
CREATE TABLE IF NOT EXISTS `loan_matches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `assessment_id` INT NOT NULL,
    `loan_product_id` INT NOT NULL,
    `match_score` DECIMAL(5,2) NOT NULL, -- percentage match 0-100%
    `match_status` ENUM('HIGHLY_RECOMMENDED', 'ELIGIBLE', 'CONDITIONAL', 'INELIGIBLE') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`loan_product_id`) REFERENCES `loan_products`(`id`) ON DELETE CASCADE
);
