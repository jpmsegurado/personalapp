import {Page,NavController} from 'ionic-angular';
import {AddAlunoPage} from "../add-aluno/add-aluno";
import {Grupo} from '../../providers/grupo/grupo';
import {AddGroupPage} from '../add-group/add-group';
import {NgZone} from '@angular/core';
import {AlunoInfoPage} from '../aluno-info/aluno-info';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  static get parameters() {
    return [[NavController],[Grupo],[NgZone]];
  }

  constructor(nav,GrupoService,zone) {
    this.nav = nav;
    this.zone = zone;
    this.view = "alunos";
    this.GrupoService = GrupoService;
  }

  onPageWillEnter(){
    this.zone.run(() => {
      this.GrupoService.getAll().subscribe((data) => {
        this.grupos = data;
      });
    });
  }

  groups(){
    this.nav.push(AddGroupPage);
  }



  onSegmentChanged(event){
    this.view = event.value;
  }

  alunoInfo(grupo,aluno){
    this.nav.push(AlunoInfoPage,{grupo:grupo,aluno:aluno});
  }

  add(){
    this.nav.push(AddAlunoPage);
  }

}
