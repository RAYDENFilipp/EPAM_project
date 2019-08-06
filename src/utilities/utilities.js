import { writable } from "svelte/store";

/** This store is used to keep track of changes made to
 * slide Index by any of the involved components and
 * to make changes by any of the involved components,
 * i.e. share state between indirectly related elements
 */
function createSlideIndexStore() {
  const { subscribe, update, set } = writable(0);
  return {
    subscribe,
    increment: () => update(n => (n === 2 ? 0 : ++n)),
    decrement: () => update(n => (n === 0 ? 2 : --n)),
    set
  };
}

/** This store is used to keep track of the current page number
 */
function createPageCounterStore() {
  const { subscribe, update, set } = writable(1);
  return {
    subscribe,
    increment: () => update(n => ++n),
    decrement: () => update(n => --n),
    set
  };
}

/**
 * put a string query starting with '/'
 * after which the function will fetch data
 * from the server and returns a Promise which when resolved
 * returns a response of data (response is OK) or object with status and reason
 * text to be used as a fallback value; rejects with an error if any happened.
 *
 * @param {String} query
 * @returns Promise
 */
function getData(query) {
  return fetch(`http://localhost:3000${query}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return {
        failed: !response.ok,
        status: response.status,
        reason: response.statusText
      };
    })
    .catch(e => {
      throw new Error(e);
    });
}

function getUser(email, password) {
  return fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => {
      const user = data.find(record => {
        return record.email === email && record.password === password;
      });
      return user;
    })
    .catch(e => {
      throw new Error(e);
    });
}

/**
 *
 * @param {String} name
 * @param {String} value
 * @param {Number} maxAge
 */
function createCookie(name, value, maxAge) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}`;
}

/**
 *
 * @param {String} name
 * @param {Number} maxAge
 */
function deleteCookie(name, maxAge) {
  document.cookie = `${encodeURIComponent(name)}=; max-age=${maxAge}`;
}

/**
 * Here we look for the first occurence of property name we are trying
 * to find a value of.
 * Then, if found, we copy substring of the value assigned to the property
 * and return it.
 *
 * @param {String} propertyName
 * @returns cookie value
 */
function getCookieFor(propertyName) {
  const cookies = document.cookie;
  const cookiesDecoded = decodeURIComponent(cookies);
  const position = cookiesDecoded.indexOf(propertyName);

  // ~(-1) = 0
  if (~position) {
    const start = position + propertyName.length + 1;
    let end = cookiesDecoded.indexOf(";", start);
    if (!~end) end = cookiesDecoded.length;

    return cookiesDecoded.substring(start, end);
  }
}

/**
 * put a string query starting with '/'
 * after which the function will send data
 * to the server
 *
 * @param {String} query
 * @param {String} [method="GET"]
 * @param {Object} [body={}]
 * @returns
 */
function sendData(query, method = "GET", body = {}) {
  return fetch(`http://localhost:3000${query}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).catch(e => {
    throw new Error(e);
  });
}

/**
 * array of months names to be used in the parseDate()
 */
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

/**
 *
 *
 * @param {Date} date
 * @returns {month, year, datePrefixed, hours, minutes}
 */
function parseDate(date) {
  const dateObj = new Date(date);
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const dateNumber = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const datePrefixed =
    dateNumber === 1 || dateNumber === 31
      ? dateNumber + "st"
      : dateNumber === 2
        ? dateNumber + "nd"
        : dateNumber === 3 || dateNumber === 23
          ? dateNumber + "rd"
          : dateNumber + "th";

  return { month, year, datePrefixed, hours, minutes };
}

function debounce(fn, ms) {
  let timer;

  return function(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

const slideIndex = createSlideIndexStore();
const pageCurrent = createPageCounterStore();
const postObject = writable({});
const postPicked = writable(false);
const formPicked = writable(false);
const userLoggedIn = writable(null);
const submitType = writable("");
const searchFilter = writable("");
const sortDateFilter = writable("");
const pagePicked = writable("/");

export {
  slideIndex,
  getData,
  parseDate,
  postObject,
  postPicked,
  debounce,
  searchFilter,
  sendData,
  pageCurrent,
  formPicked,
  submitType,
  userLoggedIn,
  getUser,
  createCookie,
  deleteCookie,
  getCookieFor,
  sortDateFilter,
  pagePicked
};
