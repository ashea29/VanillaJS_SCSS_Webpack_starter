import { render } from "lit-html";
import AboutTemplate from "./about.template";
import Hero from "./components/hero/hero.module";
import "@src/global.styles.scss";
import "./about.page.scss";

class About {
  template = AboutTemplate;

  components = [{ module: Hero }];

  init() {
    const renderTarget = document.body;
    render(this.template, renderTarget);

    this.initComponents();
  }

  initComponents() {
    this.components.forEach((c) => {
      c.module.init();
    }, this);
  }
}

export default About;