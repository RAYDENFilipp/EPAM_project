<script>
  import { sendData } from "../../utilities/helperFunctions";
  import { formPicked, userLoggedIn } from "../../utilities/stores";

  let validated = false;

  function submitPostForm(event) {
    const form = event.target;
    const body = {
      author_id: $userLoggedIn,
      title: form.title.value,
      slogan: form.slogan.value,
      text: form.text.value,
      date: new Date().toISOString(),
      comments: []
    };
    sendData(`/posts`, "POST", body)
      .then(response => {
        if (response.ok) {
          alert("Success");
        } else {
          alert("Failed at posting.");
        }
      })
      .catch(e => {
        alert(
          `Failed at posting.\nEither server might be dead or your connection lost.\nReason: ${e.message}`
        );
      });
    formPicked.set(false);
  }
</script>

<form
  class="col-lg-8 mx-auto my-5"
  class:was-validated={validated}
  on:submit|preventDefault={submitPostForm}>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label" for="formTitle">Title</label>
    <div class="col-sm-10">
      <input
        class="form-control"
        id="formTitle"
        name="title"
        type="text"
        pattern="[\w\s]+"
        maxlength="50"
        required
        placeholder="50 characters max..." />
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label" for="slogan">Slogan</label>
    <div class="col-sm-10">
      <input
        class="form-control"
        id="slogan"
        name="slogan"
        type="text"
        pattern="[\w\s]+"
        maxlength="50"
        required
        placeholder="Catching summary, 50 characters max..." />
    </div>
  </div>

  <div class="form-group row">
    <label class="col-sm-2 col-form-label" for="postText">Text</label>
    <div class="col-sm-10">
      <textarea
        class="form-control"
        id="postText"
        name="text"
        rows="3"
        minlength="10"
        required
        placeholder="Text for your post...">Hello World</textarea>
    </div>
  </div>
  <div class="form-inline row justify-content-end">
    <div class="col-md-2 px-md-0">
      <button
        class="btn btn-primary btn-block"
        type="submit"
        on:click|once={() => (validated = true)}>
        Post
      </button>
    </div>
    <div class="col-md-2 px-md-0">
      <button class="btn btn-secondary btn-block" type="reset">Reset</button>
    </div>
    <div class="col-md-2 pl-md-0">
      <button
        class="btn btn-danger btn-block"
        on:click={() => formPicked.set(false)}>
        Cancel
      </button>
    </div>
  </div>
</form>
