import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status > 400) {
      console.log("Thao tác không thành công, vui lòng liên hệ MISA.");
    }

    return Promise.reject(error);
  }
);