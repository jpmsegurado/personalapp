import {Page,NavController} from 'ionic-angular';
import {AddAlunoPage} from "../add-aluno/add-aluno";
import {Grupo} from '../../providers/grupo/grupo';
import {AddGroupPage} from '../add-group/add-group';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  static get parameters() {
    return [[NavController],[Grupo]];
  }

  constructor(nav,GrupoService) {
    this.nav = nav;
    this.view = "alunos";
    this.GrupoService = GrupoService;
  }

  onPageWillEnter(){
    this.GrupoService.getAll().subscribe((data) => {
      console.log(data);
      this.alunos = [];
    });
  }

  groups(){
    this.nav.push(AddGroupPage);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }

  add(){
    this.nav.push(AddAlunoPage);
  }

}
