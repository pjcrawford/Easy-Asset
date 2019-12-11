
import axios from "axios";

export function fetchLoginStatus() {
    const request = axios
      .get(`/auth/login/success`, { withCredentials: true })
      .catch(err => {
        console.log(err);
      });
    return {
      type: AUTH_USER,
      payload: request
    };
  }