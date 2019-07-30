<script>
  import { onMount } from "svelte";
  import PostItem from "./PostItem.svelte";
  import Post from "./Post.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import Pagination from "./Pagination.svelte";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Footer from "../Footer/Footer.svelte";

  const getData = function() {
    const data = fetch("http://localhost:3000/posts").then(response => response.json()).catch(e => {throw new Error(e)});
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
      <!-- Blog Entries Column -->
      <div class="col-md-8">

        {#await dataBase}
          <h1 class="my-4">
            Great Blog
            <small>Fetching data...</small>
          </h1>
        {:then posts}
          {#each posts as post}
            <PostItem />
          {/each}
          <Pagination />
        {:catch error}
          <h1 class="danger">
            Can't load data. Reason: {error.message}. Please, reload the page
          </h1>
        {/await}

        <!-- <PostItem />
        <PostItem />
        <PostItem />
        <Post /> -->

      </div>
      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <SearchWidget />

      </div>
    </div>
    <!-- /.row -->
  </main>
  <Footer />
</div>
