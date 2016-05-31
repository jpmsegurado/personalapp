import {Page, NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';
import {DatePicker} from 'ionic-native';
import VMasker from 'vanilla-masker/lib/vanilla-masker';
import {ElementRef} from '@angular/core';
import {NgZone} from '@angular/core';

@Page({
  templateUrl: 'build/pages/add-aula/add-aula.html'
})
export class AddAulaPage {
  static get parameters() {
    return [[NavController],[Grupo],[ElementRef],[NgZone]];
  }

  constructor(nav,GrupoService,el,zone) {
    this.nav = nav;
    this.zone = zone;
    this.GrupoService = GrupoService;
    this.el = el;
    this.GrupoService.getAll().subscribe((data) => {
      // this.grupos = data;
      this.grupos = [];
      this.alunos = [];
      data.forEach((item) => {
        if(item.nome.length > 0){
          this.grupos.push(item);
        }else{
          this.alunos.push(item);
        }
      });

    });

    this.view = "aluno";

    this.aula = {
      alunoId:{value:-1,required:true},
      grupoId:{value: -1,required:true},
      dia:{value:"Segunda",required:true},
      hora_inicio:{value:"",required:true},
      hora_fim:{value:"",required:true},
      preco_aula:{value:"",required:true}
    };
    this.dias_semana = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ];
    this.dia = this.dias_semana[0];
  }

  ngOnInit(){
    this.initMasks();
  }

  initMasks(){
    // this.zone.run(() => {
    //   setTimeout(() => {
    //     VMasker(this.el.nativeElement.querySelector('.hora-inicio input')).maskPattern('99:99');
    //     VMasker(this.el.nativeElement.querySelector('.hora-fim input')).maskPattern('99:99');
    //     VMasker(this.el.nativeElement.querySelector('.preco-hora input')).maskMoney({
    //       precision: 2,
    //       separator: ',',
    //       delimiter: '.',
    //       zeroCents: true
    //     });
    //     VMasker(this.el.nativeElement.querySelector('.preco-aula input')).maskMoney({
    //       precision: 2,
    //       separator: ',',
    //       delimiter: '.',
    //       zeroCents: true
    //     });
    //   },500);
    // });
  }

  onSegmentChanged(event){
    this.view = event.value;
    this.initMasks();
  }

  getHour(str){
    if(!window.cordova){
      if(str == 'inicio'){
        this.aula.hora_inicio.value = "15:00";
      }else{
        this.aula.hora_fim.value = "16:00";
      }
      return;
    }
    DatePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme : 4,
      is24Hour:true
    },(date) => {
      this.zone.run(() => {
        setTimeout(() => {
          let hours = date.getHours();
          let minutes = date.getMinutes();
          if(hours < 10){
            hours = "0"+hours;
          }
          if(minutes < 10){
            minutes = "0"+minutes;
          }

          let time = hours+":"+minutes;
          if(str == 'inicio'){
            this.aula.hora_inicio.value = time;
          }else{
            this.aula.hora_fim.value = time;
          }
          console.log(this.aula);
        },100);
      });
    },
    (err) =>{
      console.log(err);
    });
  }

  change(aula){
    let alunoIndex = this.GrupoService._findIndex(this.alunos,aula.alunoId.value);
    this.aluno = this.alunos[alunoIndex];
  }

  changeGrupo(aula){
    let grupoIndex = this.GrupoService._findIndex(this.grupos,aula.grupoId.value);
    this.grupo = this.grupos[grupoIndex];
  }

  add(aula){
    for(var atr in aula){
      let isRequired = aula[atr].required != undefined ? true : false;
      if(isRequired){
        if((aula[atr].value == undefined || aula[atr].value.length == 0) && window.cordova){
          navigator.notification.alert(
              'Há campos vazios, por favor preencha-os.',  // message
              function(){},         // callback
              'Atenção',            // title
              'ok'                  // buttonName
          );
          return;
        }else if((aula[atr].value == undefined || aula[atr].value.length == 0) && !window.cordova){
          alert("Por favor, preencha os campos vazios.");
          return;
        }
      }
    }

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

    let newAula = {
      id:id,
      hora_inicio:aula.hora_inicio.value,
      hora_fim:aula.hora_fim.value,
      dia:aula.dia.value,
      preco_aula:aula.preco_aula.value
    };


    if(this.view == 'aluno'){
      this.grupo = null;
      this.change(aula);
      this.aluno.horarios.push(newAula);
      this.aluno.isNew = false;
      this.GrupoService.update(this.aluno).subscribe((data) => {
        window.fabric && window.fabric.Answers.sendCustomEvent("newAula", newAula);
        this.nav.pop();
      });
    }else{
      this.aluno = null;
      this.changeGrupo(aula);
      this.grupo.horarios.push(newAula);
      this.GrupoService.update(this.grupo).subscribe((data) => {
        window.fabric && window.fabric.Answers.sendCustomEvent("newAula", newAula);
        this.nav.pop();
      });
    }

  }


}
