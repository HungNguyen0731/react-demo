import qs from 'query-string';
import axiosService from './axiosService';
import { API_ENDPOINT } from '../constants';


let url = 'todos';

let userID = 'users/1239'
export const getList = (params = {}) => {
  let queryParams = '';

  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`).then(response => (response) )
  .catch(error => ({ error }))
 
};
export const addTodo= data => {
  return axiosService.post(`${API_ENDPOINT}/${userID}/${url}`, data).then(response => ( response ))
  .catch(error => ({ error }))
};

export const updateTodo = ({data}) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${data.id}`, data).then(response => ( response ))
  .catch(error => ({ error }))
};
export const deleteTodo = (id) => {
   return axiosService.delete(`${API_ENDPOINT}/${url}/${id}`).then(response => (response)
  )
  .catch(error => ({ error }))
};
