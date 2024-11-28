/** @param {string} name */
export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
* @param {string} name
* @param {string} value
*/
export function setCookie(name, value) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
}



/**
* @param {HTMLSelectElement} select
* @param {{
*  id: number,
*  name: string
* }[]} options
*/
export function initSelect(select, options) {
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    select.append(new Option(option.name, option.id));
  }
  select.selectedIndex = -1;
}
/**
* @template {object} T
* @param {T[]} array
* @param {keyof T} keyField
*/
export function createIndex(array, keyField) {
  const result = {};
  for (let index = 0; index < array.length; index++) {
      const element = array[index];
      let keyArray = result[element[keyField]];
      if (!keyArray) {
          keyArray = [];
          result[element[keyField]] = keyArray;
      }
      keyArray.push(element);
  }
  return result;
}
