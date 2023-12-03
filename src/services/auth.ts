import Cookies from 'js-cookie';

export function isAuthenticated(): boolean {
  const token = Cookies.get('jwtToken');
  if (token) {
    return true;
  } else {
    return false;
  }
}
