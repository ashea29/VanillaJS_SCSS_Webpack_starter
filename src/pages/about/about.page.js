// import { render } from "lit-html";
// import AboutTemplate from "./about.template";
import Heading from "./components/heading/aboutHeading.module";
// import "@src/global.scss";
import "./about.page.scss";

class About {
  //   template = AboutTemplate;

  components = [{ module: Heading }];

  init() {
    // const renderTarget = document.body;
    // render(this.template, renderTarget);

    // this.initComponents();
    console.log("About page");
    this.initComponents();
  }

  initComponents() {
    this.components.forEach((c) => {
      c.module.init();
    }, this);
  }
}

export default About;