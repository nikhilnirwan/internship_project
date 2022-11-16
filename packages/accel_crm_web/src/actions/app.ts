import * as Cookies from 'js-cookie';

export const appLoaded = (): any => ({
  type: 'APP_LOADED',
});

export const openNavigation = (): any => ({
  type: 'NAVIGATION_OPEN',
});

export const closeNavigation = (): any => ({
  type: 'NAVIGATION_CLOSE',
});

export const getCalendarZoom = (): number =>
  Math.min(
    Math.max(Number(Cookies.get(`${process.env.APP_COOKIE}-calendar`)), 50),
    200,
  );

export const setCalendarZoom = (zoomLevel: number) => {
  Cookies.set(`${process.env.APP_COOKIE}-calendar`, zoomLevel);
};