<script>
  export let direction;
  export let screenReaderValue;
</script>

<style>
  button {
    background: transparent;
    max-width: 4rem;
    outline: none;
    text-decoration: none;
  }

  button:focus {
    opacity: 0.5;
  }
</style>

<button class="carousel-control-{direction} border-0" on:click>
  <span class="carousel-control-{direction}-icon" aria-hidden="true" />
  <span class="sr-only">{screenReaderValue}</span>
</button>
