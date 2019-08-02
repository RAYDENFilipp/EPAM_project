<script>
  import Comment from "./Comment.svelte";
  export let id, title, slogan, text, authorPromise, date, comments;
</script>

<style>
  /* your styles go here */
</style>

<div class="col-lg-8 mx-auto">
  <!-- promise was fulfilled -->

  <!-- Title -->
  <h1 class="mt-4">{title}</h1>

  <!-- Author -->
  {#await authorPromise then author}
    <p class="lead">
      by
      <em>{author.first_name} {author.last_name}</em>
    </p>
  {/await}

  <hr />

  <!-- Date/Time -->
  <p>Posted on {date.month} {date.datePrefixed}, {date.year}</p>

  <hr />

  <hr />

  <!-- Post Content -->
  <p class="lead">{slogan}</p>

  <p>{text}</p>

  <hr />
  <!-- Comments Form -->
  <div class="card my-4">
    <h5 class="card-header">Leave a Comment:</h5>
    <div class="card-body">
      <form>
        <div class="form-group">
          <textarea class="form-control" rows="3" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

  <!-- Comments section -->

  <div class="media mb-4">
    {#each comments as comment}
      <Comment {...comment} />
    {/each}
  </div>
</div>
