<script>
  import Comment from "./Comment.svelte";
  export let id, title, slogan, text, authorPromise, date, comments;
</script>

<style>
  /* your styles go here */
</style>

<div class="col-lg-8 mx-auto mt-2">
  <!-- promise was fulfilled -->
  <button class="btn btn-primary" on:click>← Back</button>
  <!-- Title -->
  <h1 class="mt-1">{title}</h1>

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
    <form>
      <label for="comment" class="card-header h5 w-100">Leave a Comment:</label>
      <div class="card-body">
        <div class="form-group">
          <textarea id="comment" class="form-control" rows="3" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>

  <!-- Comments section -->

  <div class="d-flex flex-column mb-4">
    {#each comments as comment}
      <Comment {...comment} />
    {/each}
  </div>
</div>
