import {Page,NavController} from 'ionic-angular';
import {AddAulaPage} from "../add-aula/add-aula";
import {Aula} from '../../providers/aula/aula';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters() {
    return [[NavController],[Aula]];
  }

  constructor(nav,AulaService) {
    this.nav = nav;
    this.view = "hoje";
    this.AulaService = AulaService;
    this.AulaService.getAll().subscribe((data) => {
      console.log(data);
      this.aula = data;
    });
  }



  add(){
    this.nav.push(AddAulaPage);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }


}
