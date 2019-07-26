<script>
  import { slideIndex } from "../../utilities/stores";
  import { fade } from "svelte/transition";

  /* Media to bundle */
  import "../../media/img_lights_wide.jpg";
  import "../../media/img_mountains_wide.jpg";
  import "../../media/img_nature_wide.jpg";

  let images = [
    {
      id: 0,
      src: "./media/img_lights_wide.jpg",
      caption: "First title",
      color: "text-light"
    },
    {
      id: 1,
      src: "./media/img_mountains_wide.jpg",
      caption: "Second Title",
      color: "text-light"
    },
    {
      id: 2,
      src: "./media/img_nature_wide.jpg",
      caption: "Third Title",
      color: "text-light"
    }
  ];

  /** with this 'reactive declaration' we can handle change of store's value
   * and draw a respective slider
   * */
  $: itemtoDraw = images[$slideIndex];
</script>

<style>
  .carousel {
    background: no-repeat center center scroll;
    background-size: cover;
    min-height: 250px;
  }

  .carousel__caption--transparent {
    opacity: 0.8;
  }
</style>

<div class="carousel-inner">

  {#each images as { id, src, caption, color }}
    <!-- one of the ways we can render only one slider to the DOM instead of three -->
    {#if $slideIndex === id}
      <div
        class:active={id === $slideIndex}
        class="carousel carousel-item d-flex flex-column justify-content-center
        align-items-center"
        style="background-image: url({src});"
        transition:fade>
        <section
          class="carousel__caption carousel__caption--transparent {color}
          bg-dark px-2 mx-auto my-5">
          <h2>{caption}</h2>
          <p class="h5">This is a paragraph for the {caption}.</p>
        </section>
      </div>
    {/if}
  {/each}
</div>
