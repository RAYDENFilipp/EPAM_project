<script>
  import { beforeUpdate } from "svelte";
  import { getData } from "../../utilities/utilities";
  export let pageCurrent = 1;
  export let pageEnd = false;

  getData(`/posts?_page=${pageCurrent + 1}`).then(data => {
    pageEnd = data.length < 10;
  });
</script>

<style>
  /* your styles go here */
</style>

<ul class="pagination justify-content-center mb-4">
  {#if pageCurrent > 1}
    <li class="page-item">
      <button
        type="button"
        class="btn btn-primary"
        on:click={() => pageCurrent--}>
        ← Older
      </button>
    </li>
  {/if}

  {#if !pageEnd}
    <li class="page-item">
      <button
        type="button"
        class="btn btn-primary"
        on:click={() => pageCurrent++}>
        Newer →
      </button>
    </li>
  {/if}
</ul>
