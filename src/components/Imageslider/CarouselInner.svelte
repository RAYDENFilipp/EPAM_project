<script>
  let images = [
    {
      active: true,
      src: "./media/img_lights_wide.jpg",
      alt: "northern lights"
    },
    {
      active: false,
      src: "./media/img_mountains_wide.jpg",
      alt: "mountains"
    },
    { active: false, src: "./media/img_nature_wide.jpg", alt: "nature" }
  ];
</script>

<style>

</style>

<div class="carousel-inner">

  {#each images as { active, src, alt }}
    <div class:active class="carousel-item">
      <img {src} class="d-block w-100" {alt} />
    </div>
  {/each}
  <!-- <div class="carousel-item active">
    <img
      src="https://www.w3schools.com/howto/img_snow_wide.jpg"
      class="d-block w-100"
      alt="..." />
  </div>
  <div class="carousel-item">
    <img
      src="https://www.w3schools.com/howto/img_lights_wide.jpg"
      class="d-block w-100"
      alt="..." />
  </div>
  <div class="carousel-item">
    <img
      src="https://www.w3schools.com/howto/img_mountains_wide.jpg"
      class="d-block w-100"
      alt="..." />
  </div> -->
</div>
