<script>
  export let page = 1;
  export let pageMax = 1;
</script>

<style>
  /* your styles go here */
</style>
<ul class="pagination justify-content-center mb-4">
  <li class="page-item">
    <button
      class:d-none={page === 1}
      type="button"
      class="btn btn-primary"
      on:click={() => page--}>
      ← Older
    </button>
  </li>
  <li class="page-item">
    <button
      class:d-none={page === pageMax}
      type="button"
      class="btn btn-primary"
      on:click={() => page++}>
      Newer →
    </button>
  </li>
</ul>
