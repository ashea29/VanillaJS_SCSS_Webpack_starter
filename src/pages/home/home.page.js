import { render } from "lit-html";
import HomeTemplate from "./home.template";
import Hero from "./components/hero/hero.module";
import "@pages/global.styles.scss";
import "./home.page.scss";

class Home {
  template = HomeTemplate;

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

export default Home;