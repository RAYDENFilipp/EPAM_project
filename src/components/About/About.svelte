<script>
  import img1 from "../../media/about_cabins.jpg";
  import img2 from "../../media/about_space.jpg";
  import img3 from "../../media/about_tree.jpg";
</script>

<style>
  [id="about"] {
    height: inherit;
    overflow-y: scroll;
  }

  img {
    height: 23vw;
    object-fit: cover;
    object-position: center bottom;
    width: 32vh;
  }

  @media (max-width: 1000px) {
    img {
      height: 60vw;
      width: 83vw;
    }
  }
</style>

<div id="about" class="w-100 pt-2">
  <article class="col-sm-8 my-2 mx-auto">
    <h2 class="text-center">About</h2>
    <section>
      <h3>Sub-header 1</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla,
        sem ac molestie pellentesque, massa purus consequat tellus, ac cursus
        sapien erat a nisi. Integer congue lectus id odio vestibulum
        scelerisque. Nam sed nibh ex. Pellentesque in placerat sem. Duis quis
        arcu vel nibh hendrerit scelerisque. Suspendisse eget nisi eu velit
        suscipit semper. Proin lacinia, ligula ut rutrum ornare, nunc lacus
        pretium neque, vitae venenatis ex mauris ac dolor. Ut non purus nec
        tortor tincidunt interdum. Sed egestas neque dui, quis vehicula eros
        lobortis quis. Quisque vel congue velit.
      </p>
    </section>
    <section>
      <h3>Sub-header 2</h3>
      <p>
        Ut odio tellus, sodales eget luctus in, rhoncus sed mi. Nulla nec semper
        nisi, et fermentum neque. Morbi at rhoncus libero. Nulla nec tincidunt
        massa. Suspendisse ac tempor massa, at lacinia dui. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla
        vestibulum lorem quis nisl finibus ornare. Ut pretium consequat mi, sed
        consectetur leo cursus nec. Proin felis sem, scelerisque ac laoreet nec,
        fringilla ac nisi. Fusce eget pulvinar ante. Phasellus porta scelerisque
        elit eu luctus. In dapibus purus nec quam sodales, a feugiat metus
        gravida. Etiam consectetur iaculis rhoncus. Praesent eu metus ut lacus
        eleifend maximus nec ac ipsum. Aenean pharetra, justo quis sodales
        aliquet, risus tortor iaculis libero, eget tincidunt ipsum metus sit
        amet eros. Nullam quis nibh sed arcu vehicula efficitur.
      </p>
    </section>
    <section>
      <h3>Sub-header 3</h3>
      <div class="d-flex flex-lg-row flex-column align-items-center mx-auto">
        <img class="col mt-2" src={img1} alt="cabins" />
        <img class="col mt-2" src={img2} alt="space" />
        <img class="col mt-2" src={img3} alt="tree" />
      </div>

    </section>

  </article>

</div>
