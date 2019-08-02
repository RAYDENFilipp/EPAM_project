import { writable } from "svelte/store";

/** This store is used to keep track of changes made to
 * slide Index by any of the involved components and
 * to make changes by any of the involved components,
 * i.e. share state between indirectly related elements
 */
function createslideIndexStore() {
  const { subscribe, update, set } = writable(0);
  return {
    subscribe,
    increment: () => update(n => (n === 2 ? 0 : ++n)),
    decrement: () => update(n => (n === 0 ? 2 : --n)),
    set
  };
}

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

const slideIndex = createslideIndexStore();

export { slideIndex, getData };
