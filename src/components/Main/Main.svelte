<script>
  import PostItem from "./PostItem.svelte";
  import Post from "./Post.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import Pagination from "./Pagination.svelte";
  import Imageslider from "../Imageslider/Imageslider.svelte";
  import Footer from "../Footer/Footer.svelte";
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

        <h1 class="my-4">
          Page Heading
          <small>Secondary Text</small>
        </h1>

        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <Post />

        <Pagination />

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
