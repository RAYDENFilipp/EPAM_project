<script>
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Imageslider from "./components/Imageslider/Imageslider.svelte";
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<Navbar />
<Imageslider />

<h1>Hello {name}!</h1>
