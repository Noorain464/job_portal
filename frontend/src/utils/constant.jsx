const API_BASE_URL = (import.meta.env.VITE_BASE_URL || "http://localhost:3000").replace(/\/+$/, "")

export const USER_API_END_POINT = `${API_BASE_URL}/api/user`
export const JOB_API_END_POINT = `${API_BASE_URL}/api/job`
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/application`
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/company`