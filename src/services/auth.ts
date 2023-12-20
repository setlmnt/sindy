import * as cookie from 'cookie';

export function isAuthenticated(): boolean {
  const cookies = cookie.parse(document.cookie);
  const token = cookies.token;

  if (token) {
    return true;
  } else {
    return false;
  }
}
