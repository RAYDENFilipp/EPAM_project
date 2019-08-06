<script>
  import { getData, debounce } from "../../utilities/helperFunctions";
  import { searchFilter } from "../../utilities/stores";

  let searchString = "";
  $: searchFilter.set(searchString);

  function createSearchString(event) {
    // Make sure to empty the searchString
    searchString = "";
    // avoid sending requests to API if the searh field is empty
    if (event.target.value) {
      const searchText = event.target.value.trim();
      const usersPromise = getData(`/users?q=${searchText}`).then(data => {
        data.forEach(user => {
          searchString += `author_id=${user.id}&`;
        });
      });

      /* It might happen that searched word might be found in both users and *  posts.
       */
      const postsTitlePromise = getData(`/posts?title_like=${searchText}`);
      const postsSloganPromise = getData(`/posts?slogan_like=${searchText}`);

      Promise.all([postsTitlePromise, postsSloganPromise])
        .then(values => values.filter(value => value.length))
        .then(arrayOfFiltered => {
          if (arrayOfFiltered.length) {
            /*Promise.All results in an array of arrays, so in case two promises results passed the filter we have to process their data this way
             */
            arrayOfFiltered.forEach(data => {
              data.forEach(post => {
                searchString += `id=${post.id}&`;
              });
            });
          }
        });
    }
  }
</script>

<div class="card my-4">
  <label for="search" class="h5 card-header">Search</label>
  <div class="card-body">
    <div class="input-group">
      <input
        type="search"
        id="search"
        class="form-control"
        placeholder="Name, Lastname, Title or slogan"
        on:input={debounce(createSearchString, 600)} />
    </div>
  </div>
</div>
