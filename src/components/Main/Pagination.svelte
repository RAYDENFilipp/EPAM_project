<script>
  import { beforeUpdate } from "svelte";
  import { getData } from "../../utilities/helperFunctions";
  import { searchFilter, pageCurrent } from "../../utilities/stores";
  export let pageEnd = false;

  getData(`/posts?${$searchFilter}_page=${$pageCurrent + 1}`).then(data => {
    pageEnd = data.length === 0;
  });
</script>

<ul class="pagination justify-content-center mb-4">
  {#if $pageCurrent > 1}
    <li class="page-item">
      <button
        type="button"
        class="btn btn-primary"
        on:click={pageCurrent.decrement}>
        ← Older
      </button>
    </li>
  {/if}

  {#if !pageEnd}
    <li class="page-item">
      <button
        type="button"
        class="btn btn-primary"
        on:click={pageCurrent.increment}>
        Newer →
      </button>
    </li>
  {/if}
</ul>
