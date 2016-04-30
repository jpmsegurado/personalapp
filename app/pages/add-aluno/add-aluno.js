import {Page, NavController,SqlStorage,Storage,Alert} from 'ionic-angular';

/*
  Generated class for the AddAlunoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/add-aluno/add-aluno.html',
})
export class AddAlunoPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.aluno = {
      nome:"",
      telefone:"",
      nascimento:"",
      peso:"",
      altura:"",
      objetivo:""
    };
    this.db = new Storage(SqlStorage);

  }

  add(aluno){

    for(var atr in aluno){
      if(aluno[atr] == undefined || aluno[atr].length == 0){
        let alert = Alert.create({
          title: 'Atenção',
          message:"Por favor, preencha os campos vazios.",
          buttons: ["ok"]
        });

        this.nav.present(alert);
      }

    }
  }

}
