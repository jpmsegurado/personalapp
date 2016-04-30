import {Page} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
import {Page4} from '../page4/page4';
import {Http, HTTP_PROVIDERS} from 'angular2/http';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page

    var stamplay = require("stamplay");
    var Stamplay = new stamplay("personalapp", "c7f690e671f3cc821a63db1c7ec2f1d144b65eca84e2f4677856f12e316d3ad5");

    this.tab1Root = Page1;
    this.tab2Root = Page2;
    this.tab3Root = Page3;
    this.tab4Root = Page4

    let newAula = {
      "hora_fim":"19:00",
      "hora_inicio":"18:00"
    };

  



  }
}
