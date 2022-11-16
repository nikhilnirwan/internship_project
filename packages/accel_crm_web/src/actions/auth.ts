import axios from 'axios';
import ReactGA from 'react-ga';
import * as Cookies from 'js-cookie';
import { merge } from 'lodash';
import jwt_decode from "jwt-decode";

/**
 * Check the currently logged in user's authentication status
 */
export const checkAuth = (): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL}/authentication`);
  if (response.data.code !== 200) {
    dispatch({ type: 'APP_UNAUTHENTICATED' });
    return false;
  }
  dispatch({ type: 'APP_AUTHENTICATED', user: response.data.data });
  return response.data.data;
};

/**
 * Check the currently logged in user's global administrative rights
 */
export const checkGlobalAdmin = (): any => async (dispatch) => {
  const response = await axios.get(`${process.env.API_URL}/v1/authentication/admin`);
  if (response.data.errors) {
    dispatch({ type: 'APP_DISABLE_ADMIN' });
    return false;
  }
  dispatch({ type: 'APP_ENABLE_ADMIN' });
  return true;
};

/**
 * Set the authorization headers
 */
export const setAuthHeader = (jwt: string): any => async (dispatch) => {
  axios.defaults.headers.common['authorization'] = `Bearer ${jwt}`;
  axios.defaults.headers.common['token'] = jwt;
};

/**
 * Set the authentication session JWT token & Role of user/Admin
 */
export const setJWT = (jwt: string): any => async (dispatch) => {
  let payload = { jwt };
  let { designation }: any = jwt_decode(jwt);
  if (designation == 'Admin') {
    dispatch({ type: 'APP_ENABLE_ADMIN' })
  } else {
    dispatch({ type: 'APP_DISABLE_ADMIN' })
  }
  const localData = Cookies.getJSON(process.env.APP_COOKIE);

  if (localData) {
    payload = merge(localData, payload);
  }
  Cookies.set(process.env.APP_COOKIE, payload);
};

/**
 * Get the authentication session JWT token
 */
export const getJWT = (): any => async (dispatch) => {
  const localData = Cookies.getJSON(process.env.APP_COOKIE);
  if (localData) {
    let { designation }: any = jwt_decode(localData.jwt);
    if (designation == 'Admin') {
      dispatch({ type: 'APP_ENABLE_ADMIN' })
    } else {
      dispatch({ type: 'APP_DISABLE_ADMIN' })
    }
    return localData.jwt;
  }
  return undefined;
};

/**
 * Get the authentication session Designation
 */
export const getRole = (): any => async (dispatch) => {
  const localData = Cookies.getJSON(process.env.APP_COOKIE);
  if (localData) {
    return localData.role;
  }
  return undefined;
};

/**
 * Clear the authentication session JWT token
 */
export const clearJWT = (): any => async (dispatch) => {
  Cookies.remove(process.env.APP_COOKIE);
};

/**
 * Register a new user
 */
export const register = (email: string, password: string, segment_id: number, role: string, Expiry: string): any => async (
  dispatch,
) => {
  // console.log('newww dataaaaaaaa:email',email,'passsss',password,'segment',segment_id,'expiry',Expiry)
  const x = await dispatch(getJWT());
  console.log('OOOOOOOOOOO', x);
  const response = await axios.post(`${process.env.API_URL}/v1//authentication/register`, {
    email,
    password,
    segment_id,
    role,
    Expiry,
    x,

  });
  console.log(' data of auth function register reasponce', response);
  ReactGA.event({
    category: 'User',
    action: 'Register a new user',
  });
  return response.data;
};

/**
 * Login an existing user
 */
export const loginUser = (username: string, password: string, callback)
  : any => async (dispatch) => {
    const response = await axios.post(`${process.env.API_URL}/authentication/login`, {
      username,
      password,
    });
    if (response.data.code === 200) {
      try {
        await dispatch(setJWT(response.data.data.accessToken));
        await dispatch(setAuthHeader(response.data.data.accessToken));
        await dispatch(checkAuth());
        callback(response.data);
      } catch (error) {
        callback(response.data);
      }
    }
    return response.data;
  };

/**
 * Logout a currently logged in user
 */
export const logout = (callback: Function): any => async (dispatch) => {
  if (window.confirm('Are you sure you want to logout?')) {
    // const response = await axios.post(`${process.env.API_URL}/v1//authentication/logout`);
    // if (!response.data.errors) {
    await dispatch(clearJWT());
    await dispatch(checkAuth());
    callback();
    return;
    // }
    // return response.data;
  }
};

// segment list

export const segmentList = ()

  : any => async () => {
    console.log('return data of auth function11111', 'eeeeeeee');
    const response = await axios.get(`${process.env.API_URL}/v1/seg`);
    console.log('segment list ', response.data.data);
    if (!response.data.errors) {

    }

    return response.data.data;

  };

// sub broker list

export const subBrokerList = ()
  : any => async () => {
    //  console.log('return data of auth function11111','eeeeeeee');
    const response = await axios.get(`${process.env.API_URL}/v1/brokerType`);
    console.log('sub broker list:::::::>>>>>', response);
    if (!response.data.errors) {

    }

    return response.data.data;

  };

// system user list
export const getAccess = ()
  : any => async (dispatch) => {
    const response = await axios.get(`${process.env.API_URL}/routing`);
    if (response.data.data && response.data.data.length > 0) {
      let menus = [];
      let keys = {};
      response.data.data.forEach(element => {
        if (element.parentMenu) {
          if (keys[element.parentMenu]) {
            keys[element.parentMenu].push(element);
          } else {
            keys[element.parentMenu] = [element];
          }
        } else {
          menus.push(element);
        }
      });
      Object.keys(keys).forEach((element: any) => {
        let keyName = {};
        let subMenusObject = [];
        keys[element].forEach(subMenu => {
          if (subMenu.subparentMenu) {
            if (keyName[subMenu.subparentMenu]) {
              keyName[subMenu.subparentMenu].push(subMenu);
            } else {
              keyName[subMenu.subparentMenu] = [subMenu];
            }
          } else {
            subMenusObject.push(subMenu)
          }
        });
        Object.keys(keyName).forEach(ele => {
          subMenusObject.push({ name: ele, list: keyName[ele] })
        })
        menus.push({ name: element, list: subMenusObject })
      });
      dispatch({ type: 'APP_NAVIGATIONS', navigations: menus })
    } else {
      dispatch({ type: 'APP_NAVIGATIONS', navigations: [] })
    }
    return response.data.data;
  };

// system user list

export const systemUserList = ()
  : any => async (dispatch) => {
    const response = await axios.get(`${process.env.API_URL}/v1/users/list`);
    return response.data.data.rows;
  };

// change password

export const changepass = (oldPassword: string, newPassword: string)

  : any => async () => {

    const response = await axios.post(`${process.env.API_URL}/v1/users/changePassword`,
      {
        oldPassword,
        newPassword,
      },
    );
    console.log('cahangepass::::::::>>>>>>>', response);
    if (!response.data.errors) {

    }

    return response;

  };
