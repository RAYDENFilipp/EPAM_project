<script>
  import SmoothScroll from "smooth-scroll";
  export let collapsed = true;

  // animation polifill for old Browsers

  let links = [
    { active: true, href: "#home", text: "Home" },
    { active: false, href: "#blog", text: "Blog" },
    { active: false, href: "#contacts", text: "Contacts" }
  ];

    let scroll = new SmoothScroll('a[href*="#"]', {
      speed: 600,
      speedAsDuration: true
    });

  function handleClick(active, href) {
    if (!active) {
      links = links.map(link => {
        link.active =
          link.href === href || link.active ? !link.active : link.active;
        return link;
      });
    }
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
      <li class:active class="nav-item border-light">
        <a class="nav-link" {href} on:click={() => handleClick(active, href)}>
          {text}
          {#if active}
            <span class="sr-only">(current)</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
  <!-- <form class="form-inline mt-2 mt-md-0 mr-lg-2">
    <input
      class="form-control mr-sm-2"
      type="text"
      placeholder="Search"
      aria-label="Search" />
    <input
      class="btn btn-outline-success my-2 my-sm-0"
      type="submit"
      value="Search" />
  </form> -->
</div>
