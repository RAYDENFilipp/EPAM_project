<script>
  import Navbar from "./components/Navbar/Navbar.svelte";
  import { onMount } from "svelte";
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<Navbar />

<h1>Hello {name}!</h1>
