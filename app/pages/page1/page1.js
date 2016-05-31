import {Page,NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';
import {ChartComponent} from '../../components/chart/chart';
import {NgZone} from '@angular/core';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives:[ChartComponent]
})
export class Page1 {
  static get parameters() {
    return [[NavController],[Grupo],[NgZone]];
  }

  constructor(nav,GrupoService,zone){
    this.nav = nav;
    this.zone = zone;
    this.GrupoService = GrupoService;
    this.animate = true;
    let date = new Date();
    this.mes = date.getMonth() + 1;
    this.ano = date.getYear() + 1900;
    // this.calculando = true;
    // this.GrupoService.getAll().subscribe((grupos) => {
    //   console.log(grupos);
    //   this.totalRecebido = 0;
    //   this.totalEsperado = 0;
    //   if(grupos.length > 0){
    //     grupos.forEach((grupo) => {
    //       grupo.aulas.forEach((aula) => {
    //         if(parseInt(aula.valor)){
    //           this.totalRecebido = aula.data_pagamento != null ? this.totalRecebido + parseInt(aula.valor) : this.totalRecebido;
    //           this.totalEsperado = aula.realizada == true ? this.totalEsperado + parseInt(aula.valor) : this.totalEsperado;
    //         }
    //       });
    //     });
    //   }
    //   this.zone.run(() => {
    //     this.calculando = false;
    //     this.iniciado = true;
    //   });
    // });
  }

  init(){
    this.calculando = true;
    this.totalRecebido = 0;
    this.totalEsperado = 0;
    setTimeout(() =>{
      this.zone.run(() => {
        this.GrupoService.getAll().subscribe((grupos) => {
          console.log(grupos);
          grupos.forEach((grupo) => {
            grupo.aulas.forEach((aula) => {
              this.iniciado = true;
              this.animate = false;
              if(parseInt(aula.valor)){
                this.totalRecebido = aula.data_pagamento != null ? this.totalRecebido + parseInt(aula.valor) : this.totalRecebido;
                this.totalEsperado = aula.realizada == true ? this.totalEsperado + parseInt(aula.valor) : this.totalEsperado;
              }
            });
          });
          this.calculando = false;
          this.showMsg  = grupos.length == 0 || (this.totalEsperado == 0 && this.totalRecebido == 0) ? true : false;
        });
      });
    },50);
  }
  onPageWillEnter(){
    this.zone.run(()=>{
      this.init();
    });
  }
}
