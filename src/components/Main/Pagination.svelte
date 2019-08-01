<script>
  export let pageCurrent = 1;
  export let pageEnd = 1;
</script>

<style>
  /* your styles go here */
</style>

{@debug pageEnd}
<ul class="pagination justify-content-center mb-4">
  <li class="page-item">
    <button
      class:d-none={pageCurrent === 1}
      type="button"
      class="btn btn-primary"
      on:click={() => pageCurrent--}>
      ← Older
    </button>
  </li>
  <li class="page-item">
    <button
      class:d-none={!pageEnd || pageEnd < 10}
      type="button"
      class="btn btn-primary"
      on:click={() => pageCurrent++}>
      Newer →
    </button>
  </li>
</ul>
