import {Page, NavController,NavParams} from 'ionic-angular';
import {AvaliacoesPage} from '../avaliacoes/avaliacoes';

/*
  Generated class for the AlunoInfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/aluno-info/aluno-info.html',
})
export class AlunoInfoPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,params) {
    this.nav = nav;
    this.aluno = params.data.aluno;
    this.grupo = params.data.grupo;
  }

  avaliacoes(grupo,aluno){
    this.nav.push(AvaliacoesPage,{grupo:grupo,aluno:aluno});
  }
}
