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

export const slideIndex = createslideIndexStore();
