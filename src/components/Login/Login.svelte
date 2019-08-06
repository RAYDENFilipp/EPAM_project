<script>
  import { onMount } from "svelte";
  import { submitType, userLoggedIn } from "../../utilities/stores";
  import {
    sendData,
    getUser,
    createCookie,
    getCookieFor
  } from "../../utilities/helperFunctions";
  let validated = false;

  /* Here we check if there is any cookie in the browser and if so
we store that user_id in our store, userLoggedIn.
*/
  onMount(() => {
    if (getCookieFor("user_id")) {
      const savedId = getCookieFor("user_id");
      userLoggedIn.set(parseInt(savedId, 10));
      submitType.set("Sign Out");
    }
  });

  /* Submit function works in two different ways, on 'Sign In' and 'Sign Out.
The main difference between the two is that in the first case we check for a user email and password [1] in the database and get user's id into the store [2] on success. After that we update the databese that the user is online [3].
Finally, we change the submitType store to switch the login buttons and create a cookie. [4]
If Signing in hasn't passed the check [1], we inform the user about that[5].
Otherwise, msitake might be connected to server issues itself [6].

In the second case we check the email against the database first to make sure
we wouldn't create the very same user again [7] and if succesful we send
the request to the server and process it response in similar way as during Sign In [8].
If any failure happens, the steps are similar [9]

*/
  function submitLogin() {
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if ($submitType === "Sign In") {
      getUser(email, password, userLoggedIn) //[1]
        .then(result => {
          if (result) {
            userLoggedIn.set(parseInt(result.id, 10)); //[2]
            sendData(`/users/${$userLoggedIn}`, "PATCH", {
              logged_in: true //[3]
            });
            submitType.set("Sign Out");
            alert("Signing In Successful");
            createCookie("user_id", $userLoggedIn, 3600); //[4]
          } else {
            alert("Password and/or email are wrong"); //[5]
          }
        })
        .catch(e => {
          alert(
            `Failed at Signin in.\nEither server might be dead or your connection lost.\nReason: ${e.message}` //[6]
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
        //[7]
        if (result) {
          alert("This user exists already");
        } else {
          sendData(`/users`, "POST", body)
            .then(response => {
              if (response.ok) {
                alert("Success"); //[8]
                submitType.set("Sign Out");
                return response.json();
              } else {
                alert("Failed at posting."); //[9]
              }
            })
            .then(data => {
              userLoggedIn.set(parseInt(data.id, 10)); //[8]
              createCookie("user_id", $userLoggedIn, 3600);
            })
            .catch(e => {
              //[9]
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

<!-- Conditional render of different forms -->
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
