// import { render } from "lit-html";
// import HomeTemplate from "./home.template";
import Heading from "./components/heading/homeHeading.module";
// import "@src/global.scss";
import "./home.page.scss";

class Home {
  //   template = HomeTemplate;

  components = [{ module: Heading }];

  init() {
    console.log("Home page");
    this.initComponents();
  }

  initComponents() {
    this.components.forEach((c) => {
      c.module.init();
    }, this);
  }
}

export default Home;