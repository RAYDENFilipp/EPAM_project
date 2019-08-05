<script>
  import {
    submitType,
    deleteCookie,
    userLoggedIn,
    sendData
  } from "../../utilities/utilities";
  export let collapsed = true;

  let links = [
    { active: true, href: "#home", text: "Home" },
    { active: false, href: "#blog", text: "Blog" },
    { active: false, href: "#contacts", text: "Contacts" }
  ];

  let timeScroll;

  function handleClick(active, href, e) {
    // to clear previous click window.hash delayed update
    clearTimeout(timeScroll);
    const userAgent = window.navigator.userAgent;
    const element = document.querySelector(href);
    // /avoid preventing default since this feature won't work in IE 11
    if (!~userAgent.indexOf("Trident")) e.preventDefault();

    if (!active) {
      links = links.map(link => {
        link.active =
          link.href === href || link.active ? !link.active : link.active;
        return link;
      });
    }

    scrollSmoothly(element);
    // Add hash (#) to URL (default click behavior)
    // Also we have to ensure that our scroll ends before the window.hash update
    timeScroll = setTimeout(() => (window.location.hash = href), 730);
  }

  function scrollSmoothly(element) {
    const main = document.querySelector("[data-window='main']");
    const bodyPadding = window.getComputedStyle(document.body).paddingTop;

    main.scrollTo({
      behavior: "smooth",
      top:
        element.getBoundingClientRect().top +
        main.scrollTop -
        parseInt(bodyPadding)
    });
  }
</script>

<style>
  @media (min-width: 768px) {
    li {
      border-right: 0.2rem solid;
      min-width: 5rem;
    }

    li:first-child {
      border-left: 0.2rem solid;
    }
  }
</style>

<div class:collapse={collapsed} class="navbar-collapse">
  <ul class="navbar-nav mr-auto">
    {#each links as { active, href, text }}
      <li class:active class="nav-item border-light text-md-center">
        <a class="nav-link" {href} on:click={e => handleClick(active, href, e)}>
          {text}
          {#if active}
            <span class="sr-only">(current)</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
  <div class="form-inline mt-2 mt-md-0 mr-lg-2">
    {#if $submitType === 'Sign Out'}
      <button
        class="btn btn-outline-danger my-2 my-sm-0"
        on:click={() => {
          deleteCookie('user_id', -5);
          submitType.set('');
          sendData(`/users/${$userLoggedIn}`, 'PATCH', { logged_in: false });
          userLoggedIn.set(null);
        }}>
        Sign out
      </button>
    {:else}
      <button
        class="btn btn-outline-light mr-sm-2"
        on:click={() => submitType.set('Sign In')}>
        Sign In
      </button>
      <button
        class="btn btn-outline-light my-2 my-sm-0"
        on:click={() => submitType.set('Sign Up')}>
        Sign Up
      </button>
    {/if}
  </div>
</div>
