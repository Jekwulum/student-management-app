import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNjU4MTc3LCJpYXQiOjE2OTE2NTUxNzcsImp0aSI6IjY3ZmNmNzQzNDZmYTRkNDg4YmZjMDNiM2FiMDc4NWI1IiwidXNlcl9pZCI6IjdiNDAzNDZiLThhM2QtNGQ0Yi05ZjdmLThhYmUwMTM3MmQxMSJ9.MBMdJEBtgVHeRhHmpLI7Qd2uiNz1fdiFhbDlFhXq9WQ';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Authorization': `Bearer ${TOKEN}` }
});

