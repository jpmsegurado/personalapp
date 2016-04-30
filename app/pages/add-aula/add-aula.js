import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the AddAulaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/add-aula/add-aula.html',
})
export class AddAulaPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
