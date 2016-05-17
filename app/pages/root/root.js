import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
/*
  Generated class for the RootPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/root/root.html',
})
export class RootPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.nav.setRoot(TabsPage);
  }
}
