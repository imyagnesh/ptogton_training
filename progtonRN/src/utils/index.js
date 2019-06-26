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
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const a = 1;
