<script>
  import { onMount } from "svelte";
  import Footer from "../Footer/Footer.svelte";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Pagination from "./Pagination.svelte";
  import PendingSpinner from "./PendingSpinner.svelte";
  import Post from "./Post.svelte";
  import PostItem from "./PostItem.svelte";
  import SearchWidget from "./SearchWidget.svelte";

  const getData = function() {
    const data = fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .catch(e => {
        throw new Error(e);
      });
    // const data = response.json();

    return data;
  };

  let dataBase = getData();
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
      {#await dataBase}
        <!-- Pending spinner -->
        <PendingSpinner />
      {:then posts}
        <!-- Blog Entries Column -->
        <div class="col-md-8 mt-4">
          {#each posts as post}
            <PostItem />
          {/each}
          <Pagination />
        </div>
        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <SearchWidget />

        </div>
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
