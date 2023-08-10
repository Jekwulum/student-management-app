import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNjY1MzA4LCJpYXQiOjE2OTE2NjIzMDgsImp0aSI6IjkzNzBiZjIzOGViYjRkYTZhMDI3MjViNWNiNzI2YjA2IiwidXNlcl9pZCI6IjdiNDAzNDZiLThhM2QtNGQ0Yi05ZjdmLThhYmUwMTM3MmQxMSJ9.1NDrVOu46tD_UGnOBr179gQDnGg6hgdeirPC0W-cWpA';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Authorization': `Bearer ${TOKEN}` }
});
