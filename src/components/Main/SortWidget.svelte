<script>
  import { getData, debounce } from "../../utilities/helperFunctions";
  import { searchFilter, sortDateFilter } from "../../utilities/stores";

  let checked = false;
// sets sort order on the database for Main component
  $: if (checked) {
    sortDateFilter.set("_sort=date&_order=asc&");
  } else {
    sortDateFilter.set("_sort=date&_order=desc&");
  }
</script>

<style>
  input {
    display: none;
  }

  label::after {
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-top: 0.3em solid;
    content: "";
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
  }

  input:checked + label::after {
    border-bottom: 0.3em solid;
    border-top: 0;
  }
</style>

<div class="ml-1">
  <input type="checkbox" id="dateSort" bind:checked />
  <label for="dateSort" class="h5">Date</label>
</div>
