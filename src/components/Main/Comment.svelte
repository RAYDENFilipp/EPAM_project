<script>
  import { getData } from "../../utilities/utilities";
  export let user_id, comment;

  const userPromise = getData(`/users?id=${user_id}`).then(
    userArray => userArray[0]
  );
</script>

<style>
  /* .logged-in::before {
    background-color: green;
    border-radius: 50%;
    bottom: 2px;
    box-shadow: 0 0 10px 2px green;
    content: "";
    left: 2px;
    position: relative;
    width: 3px;
  } */
</style>

{#await userPromise then user}
  <section class:logged-in={user.logged_in} class="media mb-4">
    <img
      class="d-flex mr-3 rounded-circle"
      src={user.avatar}
      alt="Avatar {user_id}" />
    <div class="media-body">
      <h5 class="mt-0">{user.first_name} {user.last_name}</h5>
      <p>{comment}</p>
    </div>
  </section>
{/await}
