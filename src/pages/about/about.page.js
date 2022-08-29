import Heading from "./components/heading/aboutHeading.module";
import "./about.page.scss";

class About {
  components = [{ module: Heading }];

  init() {
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