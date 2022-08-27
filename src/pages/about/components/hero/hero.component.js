import { render } from "lit-html";
import HeroTemplate from "./hero.template";
import "./hero.component.scss";

class Hero {
  template = HeroTemplate;
  init() {
    const renderTarget = document.querySelector(".container");
    render(this.template, renderTarget);
  }
}

export default Hero;