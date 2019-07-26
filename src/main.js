import App from "./App.svelte";

/* Bootstrap to bundle*/
import "./vendors/bootstrap/bootstrap-reboot.min.css";
import "./vendors/bootstrap/bootstrap.min.css";
const app = new App({
    target: document.body
});

export default app;
