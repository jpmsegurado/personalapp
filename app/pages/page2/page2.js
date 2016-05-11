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

  onSegmentChanged(event){
    this.view = event.value;
  }


}
