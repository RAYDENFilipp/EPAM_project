<script>
  import { onMount } from "svelte";
  import {
    getData,
    parseDate,
    postPicked,
    postObject
  } from "../../utilities/utilities";

  export let id, title, slogan, text, author_id, date, comments;

  const [month, year, datePrefixed] = parseDate(date);
  const userPromise = getData(`/users?id=${author_id}`).then(
    userArray => userArray[0]
  );

  const main = document.querySelector("[data-window='main']");


  function revealPost() {
    main.scrollTop = 0;
    postPicked.set(true);
    postObject.set({
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
      <button class="btn btn-primary" on:click={revealPost}>
        Read More →
      </button>
    </div>
    <div class="card-footer text-muted">
      Posted on {month} {datePrefixed}, {year} by
      <em>{user.first_name} {user.last_name}</em>
    </div>
  </div>
{/await}
