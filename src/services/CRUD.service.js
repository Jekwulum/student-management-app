import { instance as Axios } from './axios.service';


export function getStudents() {
  return Axios.get(`/students/`)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error));
};

export function addStudent(payload) {
  return Axios.post(`/students/`, payload)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error));
};

export function editStudent(id, payload) {
  return Axios.patch(`/students/${id}`, payload)
    .then(response => response.data)
    .catch(error => console.error("Error: ", error));
};

export function deleteStudent(id) {
  return Axios.delete(`/students/${id}`)
    .then(response => response)
    .catch(error => console.error("Error: ", error));
};