import {
  getCookie,
  setCookie,
} from './utils.js';


const savedDataCookieKey = 'savedData';
export function getSavedData() {
  const savedData = getCookie(savedDataCookieKey);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error(error);
    }
  }
}

export function saveData(data) {
  setCookie(savedDataCookieKey, JSON.stringify(data));
}
