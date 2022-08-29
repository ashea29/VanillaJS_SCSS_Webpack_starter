import Heading from "./components/heading/homeHeading.module";
import "./home.page.scss";

class Home {

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