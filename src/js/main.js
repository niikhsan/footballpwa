import "../css/style.css";
import "../../materialize/js/materialize.min.js";
import "/sw-register.js";
import loadNav from "/modules/nav.js";
import loadPage from "/modules/page.js";

let path = window.location.hash.substr(1);
path ? path = path : path = "home";

document.addEventListener("DOMContentLoaded", () => {
	loadNav();
	loadPage(path);
})
