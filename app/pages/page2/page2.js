import {Page,NavController} from 'ionic-angular';
import {AddAulaPage} from "../add-aula/add-aula";
import {Aula} from '../../providers/aula/aula';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters() {
    return [[NavController],[Aula]];
  }

  constructor(nav,AulaService) {
    this.nav = nav;
    this.view = "hoje";
    this.AulaService = AulaService;
    this.dias_semana = [
      {title: 'Segunda',aulas:{}},
      {title: 'Terça',aulas:{}},
      {title: 'Quarta',aulas:{}},
      {title: 'Quinta',aulas:{}},
      {title: 'Sexta',aulas:{}},
      {title: 'Sábado',aulas:{}},
      {title: 'Domingo',aulas:{}}
    ];

  }


  onPageWillEnter(){
    this.AulaService.getAll().subscribe((data) => {
      data.forEach((item) => {
        this.dias_semana.forEach((dia) =>{
          if(dia.aulas[item.hora_inicio] == undefined && item.dia == dia.title){
            dia.aulas[item.hora_inicio] = [];
          }
          if(item.dia == dia.title && dia.aulas[item.hora_inicio].indexOf(item) == -1){
            dia.aulas[item.hora_inicio].push(item);
          }
        });
      });
      this.aulas = data;
    });
  }

  getAulas(obj){
    var array = [];
    for(var prop in obj){
      var item = {};
      item.qtd = obj[prop].length;
      item.title = prop;
      array.push(item);
    }

    return array;
  }
  add(){
    this.nav.push(AddAulaPage);
  }

  onSegmentChanged(event){
    this.view = event.value;
  }


}
