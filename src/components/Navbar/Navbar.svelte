<script>
  import NavbarCollapse from "./NavbarCollapse.svelte";
  import { onMount } from "svelte";

// used to control behaviour of the navbar-toggler
  let collapse = true;

  let navbar;

  /** When component is first rendered to the DOM, we have to
   * set the body's padding-top to compensate fixed navbar height
   */
  onMount(() => {
    const body = document.body;
    body.style.paddingTop = `${navbar.clientHeight}px`;
  });
</script>

<nav
  bind:this={navbar}
  class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-4">
  <h1 class="navbar-brand my-0 ml-lg-5 p-0">Project: Blog</h1>
  <button class="navbar-toggler" on:click={() => (collapse = !collapse)}>
    <span class="navbar-toggler-icon" />
  </button>
  <NavbarCollapse collapsed={collapse} />
</nav>
