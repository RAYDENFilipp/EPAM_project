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
const postObject = writable({});
const postPicked = writable(false);
const searchFilter = writable("");

export {
  slideIndex,
  getData,
  parseDate,
  postObject,
  postPicked,
  debounce,
  searchFilter
};
