import axios from "axios";

export const Get = (url, data, onSuccess, onError) => {
  return dispatch =>
    axios
      .get(`${url}`, {}, { params: data })
      .then(response => {
        dispatch(onSuccess(response.data));
      })
      .catch(error => {
        dispatch(onError(error));
      });
};