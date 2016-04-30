import {Page,NavController} from 'ionic-angular';
import {AddAlunoPage} from "../add-aluno/add-aluno";


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.view = "alunos";
  }


  onPageWillEnter(){
    //quando essa página virar a principal recarregar os alunos
  }
  onSegmentChanged(event){
    this.view = event.value;
  }

  add(){
    this.nav.push(AddAlunoPage);
  }

}
