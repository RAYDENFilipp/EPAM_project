<script>
  import { onMount } from "svelte";
  import {
    submitType,
    sendData,
    userLoggedIn,
    getUser,
    createCookie,
    getCookieFor
  } from "../../utilities/utilities";
  let validated = false;

  onMount(() => {
    if (getCookieFor("user_id")) {
      const savedId = getCookieFor("user_id");
      userLoggedIn.set(parseInt(savedId, 10));
      submitType.set("Sign Out");
    }
  });

  function submitLogin() {
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if ($submitType === "Sign In") {
      getUser(email, password, userLoggedIn)
        .then(result => {
          if (result) {
            userLoggedIn.set(parseInt(result.id, 10));
            sendData(`/users/${$userLoggedIn}`, "PATCH", {
              logged_in: true
            });
            submitType.set("Sign Out");
            alert("Signing In Successful");
            createCookie("user_id", $userLoggedIn, 3600);
          } else {
            alert("Password and/or email are wrong");
          }
        })
        .catch(e => {
          alert(
            `Failed at Signin in.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
          );
        });
    } else if ($submitType === "Sign Up") {
      const body = {
        email: email,
        password: password,
        username: form.username.value,
        first_name: form.firstName.value,
        last_name: form.lastName.value,
        avatar: "https://robohash.org/fugiatmagniatque.jpg?size=50x50&set=set1",
        logged_in: true
      };
      getUser(email, password, userLoggedIn).then(result => {
        if (result) {
          alert("This user exists already");
        } else {
          sendData(`/users`, "POST", body)
            .then(response => {
              if (response.ok) {
                alert("Success");
                submitType.set("Sign Out");
                return response.json();
              } else {
                alert("Failed at posting.");
              }
            })
            .then(data => {
              userLoggedIn.set(parseInt(data.id, 10));
              createCookie("user_id", $userLoggedIn, 3600);
            })
            .catch(e => {
              alert(
                `Failed at Signin up.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
              );
            });
        }
      });
    }
  }
</script>

<style>
  form {
    background-color: white;
    box-shadow: 0 13px 50px 3px black;
    height: auto;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 1000;
  }

  @media (max-width: 576px) {
    form {
      width: 90%;
    }
  }
</style>

{#if $submitType === 'Sign Up' || $submitType === 'Sign In'}
  <form
    class:was-validated={validated}
    class="px-4 py-3 rounded-lg"
    on:submit|preventDefault={submitLogin}>
    <div class="form-group">
      <label for="submitEmail">Email address</label>
      <button type="button" class="close" on:click={() => submitType.set('')}>
        <span aria-hidden="true">&times;</span>
      </button>
      <input
        type="email"
        class="form-control"
        id="submitEmail"
        name="email"
        required
        placeholder="email@example.com" />
    </div>
    <div class="form-group">
      <label for="submitPassword">Password</label>
      <input
        type="password"
        class="form-control"
        id="submitPassword"
        name="password"
        min-lenghth="8"
        required
        placeholder="Password" />
    </div>
    {#if $submitType === 'Sign Up'}
      <div class="form-group">
        <label for="submitUsername">Username</label>
        <input
          type="text"
          class="form-control"
          id="submitUsername"
          name="username"
          pattern="[\w\s]+"
          maxlength="50"
          placeholder="50 characters max..." />
      </div>
      <div class="form-group">
        <label for="submitFirstName">First name</label>
        <input
          type="text"
          class="form-control"
          id="submitFirstName"
          name="firstName"
          pattern="[\w\s]+"
          required
          placeholder="your name..." />
      </div>
      <div class="form-group">
        <label for="submitLastName">Last name</label>
        <input
          type="text"
          class="form-control"
          id="submitLastName"
          name="lastName"
          pattern="[\w\s]+"
          required
          placeholder="your Last name..." />
      </div>
    {/if}
    <button type="submit" class="btn btn-primary">{$submitType}</button>
  </form>
{/if}
