import axios from 'axios';

export const addTimeSheet = (data): any => async (dispatch) => {
  const response = await axios.post(`${process.env.API_URL}/timesheet/add`, data);
  return response.data;
};

export const getTimeSheet = (date, userId): any => async (dispatch) => {
  const response = await axios.post(`${process.env.API_URL}/timesheet/get/?date=` + date, { userId });
  return response.data.data;
};

export const getUserList = (date): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL}/timesheet/get/userlist/?date=` + date);
  return response.data.data;
};

export const getData = (url): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL + url}`);
  return response.data;
};

export const getDataBy = (url): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL + url}`);
  return response.data;
};

export const deleteRow = (url): any => async (dispatch) => {
  const response = await axios.delete(`${process.env.API_URL + url}`);
  return response.data;
};

