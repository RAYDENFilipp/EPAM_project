import App from "./App.svelte";

/* Media to bundle */
import "./media/img_lights_wide.jpg";
import "./media/img_mountains_wide.jpg";
import "./media/img_nature_wide.jpg";
/* Bootstrap to bundle*/
import "./vendors/bootstrap/bootstrap-reboot.min.css";
import "./vendors/bootstrap/bootstrap.min.css";
const app = new App({
    target: document.body
});

export default app;
