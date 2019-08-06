<script>
  import NavbarCollapse from "./NavbarCollapse.svelte";

  // used to control behaviour of the navbar-toggler
  let collapse = true;
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
