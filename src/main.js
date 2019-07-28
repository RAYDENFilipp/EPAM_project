import App from "./App.svelte";

/* Bootstrap to bundle*/
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const app = new App({
  target: document.body
});

export default app;
