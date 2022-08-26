import "@pages/global.styles.scss";
import "./home.page.scss";
import { render } from "lit-html";
import HomeTemplate from "./home.template";
import Hero from "./components/hero/hero.module";

class Home {
  //   template = HomeTemplate;
  //   renderTarget = document.body;

  components = [{ module: Hero }];

  init() {
    const container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);
  }

  initComponents() {
    this.components.forEach((c) => {
      c.module.init();
    }, this);
  }
}

export default Home;