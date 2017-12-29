import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookArchiveJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const logout = () => dispatch => {
    localStorage.removeItem('bookArchiveJWT');
    dispatch(userLoggedOut());
  };

export const confirm = (token) => (dispatch) => api.user.confirm(token)
.then(user => {
  localStorage.bookArchiveJWT = user.token;
  dispatch(userLoggedIn(user));
});
