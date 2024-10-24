import cookie from "js-cookie";

const tokenKey = "health-admin-token";

export const setToken = (token) => {
  cookie.set(tokenKey, token);
};

export const getToken = () => {
  return cookie.get(tokenKey);
};

export const removeToken = () => {
  return cookie.remove(tokenKey);
};
