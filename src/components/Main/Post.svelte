<script>
  import Comment from "./Comment.svelte";
  import CommentForm from "./CommentForm.svelte";
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
  <p>
    Posted on {date.month} {date.datePrefixed}, {date.year} {date.hours}:{date.minutes}
  </p>

  <hr />

  <hr />

  <!-- Post Content -->
  <p class="lead">{slogan}</p>

  <p>{text}</p>

  <hr />
  <!-- Comments Form -->
  <CommentForm postId={id} />
  <!-- Comments section -->

  <div class="d-flex flex-column mb-4">
    {#each comments as comment}
      <Comment {...comment} />
    {/each}
  </div>
</div>
