import "@pages/global.styles.scss";
import "./home.page.scss";
import { render } from "lit-html";
import HomeTemplate from "./home.template";
import Hero from "./components/hero/hero.module";

class Home {
  template = HomeTemplate;

  components = [{ module: Hero }];

  init() {
    const renderTarget = document.body;
    render(this.template, renderTarget);
    // render(this.template, document.body)
    // const container = document.createElement("div");
    // container.classList.add("container");
    // document.body.appendChild(container);

    this.initComponents();
  }

  initComponents() {
    this.components.forEach((c) => {
      c.module.init();
    }, this);
  }
}

export default Home;