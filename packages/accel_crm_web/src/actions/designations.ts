import axios from 'axios';


export const addDesignation = (data): any => async (dispatch) => {
  const response = await axios.post(`${process.env.API_URL}/designation/addDesignation`, data);
  return response.data;
};

export const getDesignation = (): any => async (dispatch) => {
    const response = await axios.post(`${process.env.API_URL}/designation/getAllDesignation`);
    return response.data.data;
  };
  