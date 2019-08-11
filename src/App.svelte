<script>
  import { pagePicked } from "./utilities/stores";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Login from "./components/Login/Login.svelte";
  import Imageslider from "./components/Imageslider/Imageslider.svelte";
  import Main from "./components/Main/Main.svelte";
  import About from "./components/About/About.svelte";
  import Contacts from "./components/Contacts/Contacts.svelte";
</script>

<style>
  :global(body) {
    height: 100vh;
  }
</style>

<Navbar />
<Login />
{#if $pagePicked === '#about'}
  <About />
{:else if $pagePicked === '#contacts'}
  <Contacts />
{:else}
  <Main />
{/if}
