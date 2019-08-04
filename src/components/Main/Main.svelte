<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Footer from "../Footer/Footer.svelte";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Pagination from "./Pagination.svelte";
  import PendingSpinner from "./PendingSpinner.svelte";
  import Post from "./Post.svelte";
  import PostItem from "./PostItem.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import {
    getData,
    postObject,
    postPicked,
    searchFilter
  } from "../../utilities/utilities";

  let pageCurrent = 1;
  let dataPromise;
  $: dataPromise = getData(`/posts?${$searchFilter}_page=${pageCurrent}`);
</script>

<style>
  [data-window="main"] {
    height: inherit;
    overflow-y: scroll;
  }

  .invisible {
    display: none;
  }

  .failed ~ .search,
  .pending ~ .search {
    display: none;
  }
</style>

<div data-window="main">
  <main class="container">

    <Imageslider />

    <div class="row" id="blog">
      {#await dataPromise}
        <!-- Pending spinner -->
        <div class="pending col-md-12">
          <PendingSpinner />
        </div>
      {:then posts}
        {#if posts.failed}
          <article class="failed my-2 mx-auto">
            <h2 class="text-danger">Can't load the page.</h2>
            <p class="h3 text-danger">Status: {posts.status}.</p>
            <p class="h3 text-danger">Reason: {posts.reason}.</p>
          </article>
        {:else if !$postPicked}
          <!-- Blog Entries Column -->
          <div class="col-lg-8 mt-4">
            {#each posts as post}
              <PostItem {...post} />
            {/each}
            <Pagination bind:pageCurrent />
          </div>
        {:else}
          <Post {...$postObject} on:click={() => postPicked.set(false)} />
        {/if}
      {:catch error}
        <!-- On error message -->
        <article class="failed my-4 mx-auto">
          <h2 class="text-danger">Failed at loading data.</h2>
          <p class="h3">{error.message}</p>
          <p class="h3">It seems the server is...dead</p>
        </article>
      {/await}
      <div class:invisible={$postPicked} class="search col-lg-4">
        <SearchWidget />
      </div>

    </div>

  </main>
  <Footer />
</div>
