<script>
  import { slideIndex } from "../../utilities/stores";

  let imageIndecies = [0, 1, 2];
</script>

<ol class="carousel-indicators">
  {#each imageIndecies as index}
    <li
      class:active={index === $slideIndex}
      on:click={() => slideIndex.set(index)} />
  {/each}
</ol>
