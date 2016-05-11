import {Page, NavController,SqlStorage,Storage,Alert} from 'ionic-angular';
import PouchDB from '../../../node_modules/pouchdb/dist/pouchdb';
import {Grupo} from '../../providers/grupo/grupo';
import {GrupoModel} from '../../models/grupo-model';

@Page({
  templateUrl: 'build/pages/add-aluno/add-aluno.html',
})
export class AddAlunoPage {
  static get parameters() {
    return [[NavController],[Grupo]];
  }

  constructor(nav,GrupoService) {
    this.nav = nav;
    this.aluno = {
      nome:"",
      telefone:"",
      nascimento:"",
      peso:"",
      altura:"",
      objetivo:""
    };

    this.GrupoService = GrupoService;

    this.GrupoService.getAll().subscribe((data) => {
      this.grupos = [];
      data.forEach((item) =>{
        if(item.nome.length > 0){
          this.grupos.push(item);
        }
      });
    });

  }

  onGrupoChange(aluno){
    let grupoIndex = this.GrupoService._findIndex(this.grupos,aluno.grupoIndex);
    aluno.grupo = this.grupos[grupoIndex];

  }

  isGroup(grupo){
    if(grupo != undefined){
      console.log(grupo.nome);
      return grupo.nome.length > 0;
    }

    return false;
  }

  add(aluno){
    for(var atr in aluno){
      if((aluno[atr] == undefined || aluno[atr].length == 0) && window.cordova && atr != "grupo"){
        navigator.notification.alert(
            'Há campos vazios, por favor preencha-os.',  // message
            function(){},         // callback
            'Atenção',            // title
            'ok'                  // buttonName
        );
        return;
      }else if((aluno[atr] == undefined || aluno[atr].length == 0) && !window.cordova && atr != "grupo"){
        alert("preencha os campos!");
        return;
      }

    }

    let createNew = aluno.groupIndex == -1 || aluno.grupoIndex == "-1" || aluno.grupo == undefined ? true : false;
    let date = new Date();
    let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];

    let id = components.join("");

    let alunoModel = {
      id:id,
      nome:aluno.nome,
      telefone:aluno.telefone,
      nascimento:aluno.nascimento,
      peso:aluno.peso,
      altura:aluno.altura,
      objetivo:aluno.objetivo
    };

    let grupo = createNew ? new GrupoModel() : this.grupos[this.GrupoService._findIndex(this.grupos,aluno.grupoIndex)];
    grupo.alunos.push(alunoModel);

    this.GrupoService.add(grupo).subscribe(() => {
      this.nav.pop();
    });

  }

}
