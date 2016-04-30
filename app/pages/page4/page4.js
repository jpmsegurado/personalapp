import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page4/page4.html'
})
export class Page4 {
  constructor() {
    this.view = "recebidos";
  }


  onSegmentChanged(event){
    this.view = event.value;
  }
}
