import axios from 'axios';
import ReactGA from 'react-ga';
import * as Cookies from 'js-cookie';
import { merge } from 'lodash';
import { Button, notification, Space } from 'antd';

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export const getDesignation = (): any => async (dispatch) => {
  const response = await axios.post(
    `${process.env.API_URL}/designation/getAllDesignation`,
  );
  return response.data.data;
};

export const addDeveloperData =
  (data): any =>
    async (dispatch) => {
      const response = await axios.post(
        `${process.env.API_URL}/pub/register`,
        data,
      );
      return response.data.data;
    };

export const getDeveloperList = (): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL}/pub/get/developer`);
  return response.data.data;
};

export const postData =
  (url, data): any =>
    async (dispatch) => {
      try {
        const response = await axios.post(`${process.env.API_URL + url}`, data);
        return response.data;
      } catch (error) {
        return error
      }
    };

export const putData =
  (url, data): any =>
    async (dispatch) => {
      const response = await axios.put(`${process.env.API_URL + url}`, data);
      if (response.data.code == 200) {
        openNotificationWithIcon('success', 'Success', 'Successfully Updated');
        return response.data.data;
      } else {
        openNotificationWithIcon('error', 'Error', response.data.message);
        return response.data
      }
    };
