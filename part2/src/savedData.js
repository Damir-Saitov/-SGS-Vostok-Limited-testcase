import {
  getCookie,
  setCookie,
} from './utils.js';


export function getSavedData(key) {
  const savedData = getCookie(key);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error(error);
    }
  }
}

export function saveData(key, data) {
  setCookie(key, JSON.stringify(data));
}
