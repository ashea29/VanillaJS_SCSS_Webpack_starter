import "./hero.component.scss";
import { render } from "lit-html";
import HeroTemplate from "./hero.template";

class Hero {
  //   init() {
  //     const renderTarget = document.querySelector(".container");
  //     render(HeroTemplate, renderTarget);
  //   }
  //   template = HeroTemplate;
  //   renderTarget = document.querySelector(".container");

  init() {
    const el = document.createElement("h1");
    const containerEl = document.querySelector(".container");
    // render(this.template, this.renderTarget);
    containerEl.appendChild(el);
  }
}

export default Hero;