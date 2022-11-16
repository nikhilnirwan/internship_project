import { assign } from 'lodash';

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  isNavigationOpen: false,
  isGlobalAdmin: false,
  user: null,
  navigations: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_NAVIGATIONS':
      return assign({}, state, {
        navigations: action.navigations,
      })
    case 'APP_LOADED':
      return assign({}, state, {
        isLoaded: true,
      });
    case 'APP_AUTHENTICATED':
      return assign({}, state, {
        isAuthenticated: true,
        user: action.user,
      });
    case 'APP_UNAUTHENTICATED':
      return assign({}, state, {
        isAuthenticated: false,
        isGlobalAdmin: false,
        user: null,
      });
    case 'APP_ENABLE_ADMIN':
      return assign({}, state, {
        isGlobalAdmin: true,
      });
    case 'APP_DISABLE_ADMIN':
      return assign({}, state, {
        isGlobalAdmin: false,
      });
    case 'NAVIGATION_OPEN':
      return assign({}, state, {
        isNavigationOpen: true,
      });
    case 'NAVIGATION_CLOSE':
      return assign({}, state, {
        isNavigationOpen: false,
      });
    case 'PATIENT_URL':
      return assign({}, state, {
        isPUBLIC: true,
      });
    default:
      return state;
  }
};
