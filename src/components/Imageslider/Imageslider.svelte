<script>
  import { slideIndex } from "../../utilities/stores";
  import { onMount, beforeUpdate } from "svelte";
  import CarouselIndicators from "./CarouselIndicators.svelte";
  import CarouselSlides from "./CarouselSlides.svelte";
  import CarouselButton from "./CarouselButton.svelte";

  let autoSlideInterval;

  /** In case If user's frequency of clicking might interfere with
   * the interval we clear the interval first
   */
  beforeUpdate(() => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  });

  // this sets autoslider to run when the component is mounted to the DOM
  onMount(() => {
    autoSlideInterval = setInterval(() => {
      slideIndex.increment();
    }, 7000);
    // when component is unmounted (onDestroy event)
    return () => clearInterval(autoSlideInterval);
  });
</script>

<style>

</style>
<header
  id="home"
  class="container carousel slide h-25 mx-auto mt-2"
  data-ride="carousel">
  <CarouselIndicators />
  <CarouselSlides />
  <CarouselButton
    direction="prev"
    screenReaderValue="Previous"
    on:click={slideIndex.decrement} />
  <CarouselButton
    direction="next"
    screenReaderValue="Next"
    on:click={slideIndex.increment} />
</header>
