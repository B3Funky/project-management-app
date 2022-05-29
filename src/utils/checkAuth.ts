import api, { ErrorResponse } from './ApiBackend';

export default async function checkAuth() {
  try {
    await api.user.getAll();
    return true;
  } catch (e) {
    if (e instanceof ErrorResponse) {
      if (e.status === 401) {
        return false;
      }
    }
  }
}
