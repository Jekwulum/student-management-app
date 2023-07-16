import { instance as Axios } from './axios.service';


export function getStudents() {
  return Axios.get(`/students/`)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error))
};