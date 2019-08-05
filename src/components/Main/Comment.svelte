<script>
  import {
    getData,
    parseDate,
    sendData,
    postObject,
    userLoggedIn
  } from "../../utilities/utilities";
  export let user_id, comment, date, index, authorId;
  let comments = $postObject.comments;
  let postId = $postObject.id;

  const { month, year, datePrefixed, hours, minutes } = parseDate(date);
  const userPromise = getData(`/users?id=${user_id}`).then(
    userArray => userArray[0]
  );

  function deleteComment() {
    comments.splice(index, 1);
    sendData(`/posts/${postId}`, "PATCH", { comments: comments })
      .then(response => {
        if (response.ok) {
          postObject.update(n => {
            n.comments = comments;
            return n;
          });
        } else {
          alert("Failed at posting the comment");
        }
      })
      .catch(e => {
        alert(
          `Failed at deleting the comment.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
        );
      });
  }
</script>

<style>
  .logged-in::before {
    border: 4px solid green;
    border-radius: 50%;
    bottom: -2.5rem;
    box-shadow: 0 0 8px 1px green;
    content: "";
    display: block;
    left: 1rem;
    position: relative;
    width: 4px;
  }
</style>

{#await userPromise then user}
  <section class:logged-in={user.logged_in} class="media mb-4">
    <img
      class="d-flex mr-3 rounded-circle"
      src={user.avatar}
      alt="Avatar {user_id}" />
    <div class="media-body">
      <div class="d-flex justify-content-between mt-0">
        <h5>{user.first_name} {user.last_name}</h5>
        {#if $userLoggedIn === user_id || authorId === $userLoggedIn}
          <button type="button" class="btn btn-danger" on:click={deleteComment}>
            <i class="far fa-trash-alt" />
          </button>
        {/if}
      </div>
      <p>{hours}:{minutes}, {month} {datePrefixed}, {year}</p>
      <p>{comment}</p>
    </div>
  </section>
{/await}
