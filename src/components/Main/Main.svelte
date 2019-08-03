<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import Footer from "../Footer/Footer.svelte";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Pagination from "./Pagination.svelte";
  import PendingSpinner from "./PendingSpinner.svelte";
  import Post from "./Post.svelte";
  import PostItem from "./PostItem.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import { getData, postObject, postPicked } from "../../utilities/utilities";

  let pageCurrent = 1;
  $: dataPromise = getData(`/posts?_page=${pageCurrent}`);
</script>

<style>
  [data-window="main"] {
    height: inherit;
    overflow-y: scroll;
  }
</style>

<div data-window="main">
  <main class="container">

    <Imageslider />

    <div class="row" id="blog">
      {#await dataPromise}
        <!-- Pending spinner -->
        <PendingSpinner />
      {:then posts}
        {#if posts.failed}
          <article class="my-2 mx-auto">
            <h1 class="text-danger">Can't load the page.</h1>
            <p class="h2 text-danger">Status: {posts.status}.</p>
            <p class="h2 text-danger">Reason: {posts.reason}.</p>
          </article>
        {:else if !$postPicked}
          <!-- Blog Entries Column -->
          <div class="col-md-8 mt-4">
            {#each posts as post}
              <PostItem {...post} />
            {/each}
            <Pagination bind:pageCurrent />
          </div>
          <!-- Sidebar Widgets Column -->
          <div class="col-md-4">

            <SearchWidget />

          </div>
        {:else}
          <Post {...$postObject} on:click={() => postPicked.set(false)} />
        {/if}
      {:catch error}
        <!-- On error message -->
        <div class="col-md-12 my-4 ml-5">
          <h1>Failed at loading data.</h1>
          <h3 class="text-danger">{error.message}</h3>
          <h3>Please, reload the page</h3>
        </div>
      {/await}
      <!-- /.row -->
    </div>

  </main>
  <Footer />
</div>
