import { instance as Axios } from './axios.service';


export function getStudents() {
  return Axios.get(`/students/`)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error));
};

export function editStudent(id, payload) {
  return Axios.patch(`/students/${id}`, payload)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error));
};