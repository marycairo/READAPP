export function logout() {
  sessionStorage.removeItem('USER_KEY_STORAGE');
  sessionStorage.removeItem('userID');
}