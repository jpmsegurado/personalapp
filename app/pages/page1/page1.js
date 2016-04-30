import {Page,NavController} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

  }
}
