import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  constructor() {
    this.view = "alunos";
  }

  onSegmentChanged(event){
    this.view = event.value;
  }

}
