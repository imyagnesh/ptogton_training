// import Config from 'react-native-config';

export const API = ({ url, method = 'GET', headers = {}, body = null }) => {
  let options = {};
  if (method) {
    options = { ...options, method };
  }
  if (method !== 'GET') {
    options = {
      ...options,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  }

  if (body) {
    options = { ...options, body: JSON.stringify(body) };
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      // if (url === `${Config.API_URL}authors`) {
      //   reject(new Error('Unable to fetch authors data'));
      // }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const wait = ms => new Promise(res => setTimeout(res, ms));
