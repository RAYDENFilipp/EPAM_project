<script>
  import CarouselIndicators from './CarouselIndicators.svelte';
  import CarouselInner from './CarouselInner.svelte';

  let images = [

  ]

</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <CarouselIndicators />
  <CarouselInner />
  <a
    class="carousel-control-prev"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true" />
    <span class="sr-only">Previous</span>
  </a>
  <a
    class="carousel-control-next"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true" />
    <span class="sr-only">Next</span>
  </a>
</div>
