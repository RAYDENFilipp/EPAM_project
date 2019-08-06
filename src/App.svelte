<script>
  import { pagePicked } from "./utilities/utilities.js";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Login from "./components/Login/Login.svelte";
  import Imageslider from "./components/Imageslider/Imageslider.svelte";
  import Main from "./components/Main/Main.svelte";
  import About from "./components/About/About.svelte";
  import Contacts from "../Contacts/Contacts.svelte";
</script>

<Navbar />
{#if $pagePicked === '#about'}
  <About />
{:else if $pagePicked === '#about'}
  <Login />
  <Main />
{/if}
