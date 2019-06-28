// import Config from 'react-native-config';
import { PermissionsAndroid, ToastAndroid, Platform } from 'react-native';

export const { OS } = Platform;

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

export const checkPermission = async type => {
  if (OS === 'ios' || (OS === 'android' && Platform.Version < 23)) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(type);

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(type);

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
};
