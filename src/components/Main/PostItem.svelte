<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { getData, parseDate } from "../../utilities/utilities";

  export let id, title, slogan, text, author_id, date, comments;

  const userPromise = getData(`/users?id=${author_id}`).then(
    userArray => userArray[0]
  );

  const [month, year, datePrefixed] = parseDate(date);

  const dispatch = createEventDispatcher();

  function revealPost() {
    dispatch("picked", {
      id: id,
      title: title,
      slogan: slogan,
      text: text,
      authorPromise: userPromise,
      date: { month: month, year: year, datePrefixed: datePrefixed },
      comments: comments
    });
  }
</script>

<style>
  /* your styles go here */
</style>

{#await userPromise then user}
  <div class="card mb-4">
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <p class="card-text">{slogan}</p>
      <a href="#posts/{id}" class="btn btn-primary" on:click={revealPost}>
        Read More →
      </a>
    </div>
    <div class="card-footer text-muted">
      Posted on {month} {datePrefixed}, {year} by
      <em>{user.first_name} {user.last_name}</em>
    </div>
  </div>
{/await}
