<script>
  export let collapsed = true;
</script>

<div class:collapse={collapsed} class="navbar-collapse">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="#home">
        Home
        <span class="sr-only">(current)</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#blog">Blog</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#contact">Contacts</a>
    </li>
  </ul>
  <form class="form-inline mt-2 mt-md-0">
    <input
      class="form-control mr-sm-2"
      type="text"
      placeholder="Search"
      aria-label="Search" />
    <input
      class="btn btn-outline-success my-2 my-sm-0"
      type="submit"
      value="Search" />
  </form>
</div>
