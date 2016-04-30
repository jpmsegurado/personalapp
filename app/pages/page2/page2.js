import {Page,NavController} from 'ionic-angular';
import {AddAulaPage} from "../add-aula/add-aula";


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.view = "hoje";
  }



  add(){
    this.nav.push(AddAulaPage);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }


}
