<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { sendData, postObject, userLoggedIn } from "../../utilities/utilities";
  let textarea = "";
  let comments = $postObject.comments;
  let postId = $postObject.id;

  const main = document.querySelector("[data-window='main']");

  function updateComment() {
    let response;
    comments.push({
      user_id: $userLoggedIn,
      comment: textarea,
      date: new Date().toISOString()
    });
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
          `Failed at posting the comment.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
        );
      });
    textarea = "";
    main.scrollTo(0, main.scrollHeight);
  }
</script>

<style>
  /* your styles go here */
</style>

<div class="card my-4">
  <form>
    <label for="comment" class="card-header h5 w-100">Leave a Comment:</label>
    <div class="card-body">
      <div class="form-group">
        <textarea
          bind:value={textarea}
          id="comment"
          class="form-control"
          rows="3" />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        on:click|preventDefault={updateComment}>
        Submit
      </button>
    </div>
  </form>
</div>
