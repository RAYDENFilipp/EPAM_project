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
  formPicked,
  pageCurrent,
  pagePicked,
  postObject,
  postPicked,
  searchFilter,
  slideIndex,
  sortDateFilter,
  submitType,
  userLoggedIn
};
