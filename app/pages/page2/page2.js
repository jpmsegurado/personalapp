import {Page,NavController} from 'ionic-angular';
import {AddAulaPage} from "../add-aula/add-aula";
import {Grupo} from '../../providers/grupo/grupo';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters() {
    return [[NavController],[Grupo]];
  }

  constructor(nav,GrupoService) {
    this.nav = nav;
    this.view = "hoje";
    this.dias_semana = [
      {title: 'Segunda',aulas:{}},
      {title: 'Terça',aulas:{}},
      {title: 'Quarta',aulas:{}},
      {title: 'Quinta',aulas:{}},
      {title: 'Sexta',aulas:{}},
      {title: 'Sábado',aulas:{}},
      {title: 'Domingo',aulas:{}}
    ];

    var d = new Date();
    var n = d.getDay();
    switch(n){
      case 0:
        this.hoje = "Domingo";
        break;
      case 1:
        this.hoje = "Segunda";
        break;
      case 2:
        this.hoje = "Terça";
        break;
      case 3:
        this.hoje = "Quarta";
        break;
      case 4:
        this.hoje = "Quinta";
        break;
      case 5:
        this.hoje = "Sexta";
        break;
      case 6:
        this.hoje = "Sábado";
        break;
    }
    this.GrupoService = GrupoService;
    this.GrupoService.getAll().subscribe((data) => {
      this.grupos = data;
      console.log(data);
    });

  }


  onPageWillEnter(){
    // this.AulaService.getAll().subscribe((data) => {
    //   console.log(data);
    //   data.forEach((item) => {
    //     this.dias_semana.forEach((dia) =>{
    //       if(dia.aulas[item.hora_inicio.value] == undefined && item.dia.value == dia.title){
    //         dia.aulas[item.hora_inicio.value] = [];
    //       }
    //       if(item.dia.value == dia.title && dia.aulas[item.hora_inicio.value].indexOf(item) == -1){
    //         dia.aulas[item.hora_inicio.value].push(item);
    //       }
    //     });
    //   });
    //   this.aulas = data;
    //});
  }

  getAulas(obj){
    // percorre o array de horário de aulas de um dia criado na função onPageWillEnter
    var array = [];
    // for(var prop in obj){
    //   var item = {};
    //   item.qtd = obj[prop].length;
    //   item.title = prop;
    //   obj[prop].forEach((aula) => {
    //     if(aula.grupo != null){
    //       item.qtd = aula.grupo.title;
    //     }
    //   });
    //   array.push(item);
    // }
    //
    // array.sort((a,b) => {
    //   if (a.title < b.title)
    //     return -1;
    //   else if (a.title > b.title)
    //     return 1;
    //   else
    //     return 0;
    // });
    return array;
  }

  isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  add(){
    this.nav.push(AddAulaPage);
  }

  matchDay(horario,dia){
    console.log(horario);
    console.log(dia);
    if(horario != undefined){
      if(horario.dia == dia){
        return true;
      }
    }
    return false;
  }
  onSegmentChanged(event){
    this.view = event.value;
  }

  confirmarAula(grupo,aula){

    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let ano = date.getYear() + 1900;
    if(dia < 10){
      dia = "0"+dia;
    }

    if(mes < 10){
      mes = "0"+mes;
    }

    let today = dia+"/"+mes+"/"+ano;

    grupo.alunos.forEach((aluno) => {
      let newAula = {
        aluno:aluno,
        aula:aula.id,
        valor:aula.preco_aula,
        realizada: true,
        data_realizada:today,
        data_pagamento:null
      };
      grupo.aulas.push(newAula);
    });

    this.GrupoService.update(grupo).subscribe((data) => {
      console.log(data);
    });
  }

  foiRealizada(grupo,aula){
    let realizada = false;
    grupo.aulas.forEach((item) => {
      realizada = item.aula == aula.id ? true : realizada;
    });

    return realizada;
  }

  sort(array){
    array.sort((a,b) => {
      if (a.hora_inicio < b.hora_inicio)
        return -1;
      else if (a.hora_inicio > b.hora_inicio)
        return 1;
      else
        return 0;
    });

    return array;
  }

}
