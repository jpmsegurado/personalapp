import {Page, NavController,NavParams} from 'ionic-angular';

/*
  Generated class for the AulasPagamentoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/aulas-pagamento/aulas-pagamento.html',
})
export class AulasPagamentoPage {
  static get parameters() {
    return [[NavController],[NavParams]];
  }

  constructor(nav,params) {
    this.nav = nav;
    this.aulas = params.data.aulas;
    this.mes = params.data.mes;
    this.ano = params.data.ano;
    console.log(this.aulas);
  }
}
