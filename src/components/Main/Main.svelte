<script>
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Pagination from "./Pagination.svelte";
  import PendingSpinner from "./PendingSpinner.svelte";
  import Post from "./Post.svelte";
  import PostCreateForm from "./PostCreateForm.svelte";
  import PostItem from "./PostItem.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import SortWidget from "./SortWidget.svelte";
  import {
    getData,
    postPicked,
    searchFilter,
    pageCurrent,
    formPicked,
    userLoggedIn,
    sortDateFilter
  } from "../../utilities/utilities";

  let main;
  $: dataPromise = getData(
    `/posts?${$searchFilter}${$sortDateFilter}_page=${$pageCurrent}`
  );

  afterUpdate(() => (main.scrollTop = 0));
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

<div data-window="main" bind:this={main}>
  <main class="container">

    <Imageslider />

    <div class="row" id="blog">
      <div class:invisible={$postPicked || $formPicked} class="col-lg-12 mt-4">
        <SortWidget />
      </div>
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
        {:else if !$postPicked && !$formPicked}
          <!-- Blog Entries Column -->
          <div class="col-lg-8 mt-4">
            {#if $userLoggedIn}
              <button
                type="button"
                class="btn btn-success btn-block btn-lg mb-2"
                on:click={() => formPicked.set(true)}>
                Add new post
              </button>
            {/if}
            {#each posts as post}
              <PostItem {...post} />
            {/each}
            <Pagination />
          </div>
        {:else if $formPicked}
          <PostCreateForm />
        {:else}
          <Post />
        {/if}
      {:catch error}
        <!-- On error message -->
        <article class="failed my-4 mx-auto">
          <h2 class="text-danger">Failed at loading data.</h2>
          <p class="h3">{error.message}</p>
          <p class="h3">It seems the server is...dead</p>
        </article>
      {/await}
      <div class:invisible={$postPicked || $formPicked} class="search col-lg-4">
        <SearchWidget />
      </div>

    </div>

  </main>
  <footer class="py-md-4 py-2 bg-dark text-light">
    <div class="container text-center">
      <h4>Philipp Lypniakov @ {new Date().getFullYear()}</h4>
    </div>
  </footer>
</div>
