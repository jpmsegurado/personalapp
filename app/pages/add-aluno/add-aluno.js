import {Page, NavController,SqlStorage,Storage,Alert} from 'ionic-angular';
import PouchDB from '../../../node_modules/pouchdb/dist/pouchdb';
import {Aluno} from '../../providers/aluno/aluno';

@Page({
  templateUrl: 'build/pages/add-aluno/add-aluno.html',
})
export class AddAlunoPage {
  static get parameters() {
    return [[NavController],[Aluno]];
  }

  constructor(nav,AlunoService) {
    this.nav = nav;
    this.AlunoService = AlunoService;
    this.aluno = {
      nome:"",
      telefone:"",
      nascimento:"",
      peso:"",
      altura:"",
      objetivo:""
    };


  }

  add(aluno){
    for(var atr in aluno){
      if(aluno[atr] == undefined || aluno[atr].length == 0){
        navigator.notification.alert(
            'Há campos vazios, por favor preencha-os.',  // message
            function(){},         // callback
            'Atenção',            // title
            'ok'                  // buttonName
        );
        return;
      }

    }

    this.AlunoService.add(aluno).subscribe(() => {
      this.nav.pop();
    });
  }

}
