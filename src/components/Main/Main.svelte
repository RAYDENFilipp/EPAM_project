<script>
  import PostItem from "./PostItem.svelte";
  import Post from "./Post.svelte";
  import SearchWidget from "./SearchWidget.svelte";
  import Pagination from "./Pagination.svelte";
</script>

<style>
  /* your styles go here */
</style>

<main class="container" id="blog">

  <div class="row">

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

      <Pagination />

    </div>

    <!-- Sidebar Widgets Column -->
    <div class="col-md-4">

      <SearchWidget />

    </div>

  </div>
  <!-- /.row -->

</main>
