import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newEntry = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const updateEntry = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data);
  return request.then((response) => response.data);
};

export default { getAll, newEntry, deleteEntry, updateEntry };
