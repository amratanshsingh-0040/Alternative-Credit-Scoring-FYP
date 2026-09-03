import axios from 'axios'

const mlAPI = axios.create({ baseURL: '/ml', timeout: 15000 })
const backendAPI = axios.create({ baseURL: '/api', timeout: 10000 })

/**
 * Generate a mock prediction result for demo purposes
 * (used when FastAPI backend is not running)
 */
function mockPredict(features) {
  const ext = (features.ext_source_1 + features.ext_source_2 + features.ext_source_3) / 3 || 0.5
  const ratio = features.credit_income_ratio || 0.5
  const p = Math.max(0.03, Math.min(0.97, 0.5 - ext * 0.4 + ratio * 0.2 + (Math.random() - 0.5) * 0.05))
  const score = Math.max(300, Math.min(900, Math.floor(900 - 600 * p)))
  return {
    score,
    default_probability: p,
    modality: features.modality || 'Combined',
    algorithm: 'XGBoost (Demo)',
    shap_factors: [
      { feature: 'EXT_SOURCE_2 (Behavioral Score 2)', impact: -0.32 * (1 - ext), direction: ext > 0.5 ? 'positive' : 'negative' },
      { feature: 'EXT_SOURCE_3 (Behavioral Score 3)', impact: -0.28 * (1 - ext), direction: ext > 0.5 ? 'positive' : 'negative' },
      { feature: 'Credit-to-Income Ratio', impact: 0.21 * ratio, direction: ratio < 0.5 ? 'positive' : 'negative' },
      { feature: 'EXT_SOURCE_1 (External Score)', impact: -0.18 * (1 - ext), direction: ext > 0.5 ? 'positive' : 'negative' },
      { feature: 'Days Employed (Stability)', impact: -0.12, direction: 'positive' },
    ],
    is_thin_file: features.bureau_year_enquiries === 0 || features.bureau_year_enquiries == null,
  }
}

export async function predictCreditScore(features) {
  try {
    const response = await mlAPI.post('/predict', features)
    return response.data
  } catch {
    // Fallback to mock if ML service not running
    return mockPredict(features)
  }
}

export default backendAPI
