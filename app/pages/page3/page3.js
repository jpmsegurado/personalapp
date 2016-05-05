import {Page,NavController} from 'ionic-angular';
import {AddAlunoPage} from "../add-aluno/add-aluno";
import {Aluno} from '../../providers/aluno/aluno';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  static get parameters() {
    return [[NavController],[Aluno]];
  }

  constructor(nav,AlunoService) {
    this.nav = nav;
    this.AlunoService = AlunoService;
    this.view = "alunos";
    this.AlunoService.getAll().subscribe((data) => {
      this.alunos = data;
    });
  }

  onPageWillEnter(){
    this.AlunoService.getAll().subscribe((data) => {
      console.log(data);
      this.alunos = data;
    });
  }
  onSegmentChanged(event){
    this.view = event.value;
  }

  add(){
    this.nav.push(AddAlunoPage);
  }

}
