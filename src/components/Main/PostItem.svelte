<script>
  import { onMount } from "svelte";
  import { createDispatchEvent } from "svelte";
  import { getData } from "../../utilities/utilities";

  export let slogan, title, id, author_id, date;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let userObject = getData(`/users?id=${author_id}`);

  const dateObj = new Date(date);
  const dateMonth = months[dateObj.getMonth()];
  const dateYear = dateObj.getFullYear();
  const dateDate = dateObj.getDate();
  const datePrefixed =
    dateDate === 1 || dateDate === 31
      ? dateDate + "st"
      : dateDate === 2
      ? dateDate + "nd"
      : dateDate === 3 || dateDate === 23
      ? dateDate + "rd"
      : dateDate + "th";
</script>

<style>
  /* your styles go here */
</style>

{#await userObject}
  <!-- promise is pending -->
{:then user}
  <div class="card mb-4">
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <p class="card-text">{slogan}</p>
      <a href="#{id}" class="btn btn-primary">Read More →</a>
    </div>
    <div class="card-footer text-muted">
      Posted on {dateMonth} {datePrefixed}, {dateYear} by
      <em>{user.first_name} {user.last_name}</em>
    </div>
  </div>
{:catch error}
  <!-- promise was rejected -->
{/await}
