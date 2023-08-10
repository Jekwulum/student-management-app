import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNjU0MjQxLCJpYXQiOjE2OTE2NTI0NDEsImp0aSI6ImE4YjQ0MGM0Mjc1MDQzZmY5ZTJmMzMzZjQzNGMxMWM0IiwidXNlcl9pZCI6IjdiNDAzNDZiLThhM2QtNGQ0Yi05ZjdmLThhYmUwMTM3MmQxMSJ9.N5JEdPD72Q21VF1WSkgH0B7Nle0MuntCkaiDsyGXiU8';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Authorization': `Bearer ${TOKEN}` }
});

