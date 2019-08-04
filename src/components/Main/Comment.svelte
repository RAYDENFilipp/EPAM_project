<script>
  import { getData, parseDate } from "../../utilities/utilities";
  export let user_id, comment, date;

  const { month, year, datePrefixed, hours, minutes } = parseDate(date);

  const userPromise = getData(`/users?id=${user_id}`).then(
    userArray => userArray[0]
  );
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
      <h5 class="mt-0">{user.first_name} {user.last_name}</h5>
      <p>{hours}:{minutes}, {month} {datePrefixed}, {year}</p>
      <p>{comment}</p>
    </div>
  </section>
{/await}
