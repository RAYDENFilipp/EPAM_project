<script>
  import {
    getData,
    parseDate,
    sendData
  } from "../../utilities/helperFunctions";
  import {
    postPicked,
    postObject,
    pageCurrent,
    searchFilter,
    userLoggedIn
  } from "../../utilities/stores";

  export let id, title, slogan, text, author_id, date, comments;
  const { month, year, datePrefixed, hours, minutes } = parseDate(date);
  const userPromise = getData(`/users/${author_id}`);
  const main = document.querySelector("[data-window='main']");
  let deleted = false;

  function revealPost() {
    postPicked.set(true);
    postObject.set({
      id: id,
      title: title,
      slogan: slogan,
      text: text,
      authorPromise: userPromise,
      date: {
        month: month,
        year: year,
        datePrefixed: datePrefixed,
        hours: hours,
        minutes: minutes
      },
      comments: comments
    });
  }

  function deletePost() {
    sendData(`/posts/${id}`, "DELETE")
      .then(response => {
        if (response.ok) {
          alert("Success");
        } else {
          alert("Failed at deleting the post");
        }
      })
      .catch(e => {
        alert(
          `Failed at deleting the post.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
        );
      });
    // reload the current page so changes are visible
    deleted = true;
  }
</script>

<style>
  .deleted {
    display: none;
  }
</style>

{#await userPromise then user}
  <div class:deleted class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mt-0">
        <h2 class="card-title">{title}</h2>
        {#if author_id === $userLoggedIn}
          <button type="button" class="btn btn-danger" on:click={deletePost}>
            <i class="far fa-trash-alt" />
          </button>
        {/if}
      </div>
      <p class="card-text">{slogan}</p>
      <button class="btn btn-primary" on:click={revealPost}>Read More →</button>
    </div>
    <div class="card-footer text-muted">
      Posted on {month} {datePrefixed}, {year} {hours}:{minutes} by
      <em>{user.first_name} {user.last_name}</em>
    </div>
  </div>
{/await}
