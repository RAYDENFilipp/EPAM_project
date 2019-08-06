<script>
  import Comment from "./Comment.svelte";
  import CommentForm from "./CommentForm.svelte";
  import { postObject, postPicked, userLoggedIn } from "../../utilities/stores";

  let { id, title, slogan, text, authorPromise, date } = $postObject;
</script>

<div class="col-lg-8 mx-auto mt-2">

  <button class="btn btn-primary" on:click={() => postPicked.set(false)}>
    ← Back
  </button>
  <!-- Title -->
  <h1 class="mt-1">{title}</h1>

  <!-- Author -->
  {#await authorPromise then author}
    <p class="lead">
      by
      <em>{author.first_name} {author.last_name}</em>
    </p>
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
    <!-- only logged in user can comment -->
    {#if $userLoggedIn}
      <CommentForm />
    {/if}

    <!-- Comments section -->
    <div class="d-flex flex-column mb-4">
      {#each $postObject.comments as comment, index}
        <Comment {...comment} {index} authorId={author.id} />
      {/each}
    </div>
  {/await}
</div>
