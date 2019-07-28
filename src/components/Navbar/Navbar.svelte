<script>
  import NavbarCollapse from "./NavbarCollapse.svelte";
  let body;

  // used to control behaviour of the navbar-toggler
  let collapse = true;

  /** When component is first rendered to the DOM, we have to
   * set the body's padding-top to compensate fixed navbarHeight height
   */
</script>

<style>
  :global(body) {
    height: 93vh;
    overflow: hidden;
    padding-top: 7vh;
  }

  nav {
    min-height: 7vh;
  }
</style>

<nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
  <h1 class="navbar-brand my-0 ml-lg-5 p-0">Project: Blog</h1>
  <button class="navbar-toggler" on:click={() => (collapse = !collapse)}>
    <span class="navbar-toggler-icon" />
  </button>
  <NavbarCollapse collapsed={collapse} />
</nav>
