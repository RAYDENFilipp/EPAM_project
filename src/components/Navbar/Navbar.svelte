<script>
  import NavbarCollapse from "./NavbarCollapse.svelte";

  let collapse = true;
</script>

<style>
  /* your styles go here */
</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <a class="navbar-brand" href="#">Project Blog</a>
  <button class="navbar-toggler" on:click={() => (collapse = !collapse)}>
    <span class="navbar-toggler-icon" />
  </button>
  <NavbarCollapse collapsed={collapse} />
</nav>
