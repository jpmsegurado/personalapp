import {Page,NavController} from 'ionic-angular';
import {Grupo} from '../../providers/grupo/grupo';
import {ChartComponent} from '../../components/chart/chart';
import {NgZone} from '@angular/core';
import {AddAlunoPage} from "../add-aluno/add-aluno";

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
  }

  goToAlunoPage(){
    this.nav.push(AddAlunoPage);
  }

  onPageWillEnter(){
    this.calculando = true;
    this.totalRecebido = 0;
    this.totalEsperado = 0;
    this.GrupoService.getAll().subscribe((grupos) => {
      if(grupos.length > 0 || this.carregando == null){
        this.carregando = true;
      }
      this.grupos = grupos;
      setTimeout(() => {
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
        this.zone.run(()=>{
          this.calculando = false;
          this.carregando = false;
          this.showMsg  = grupos.length == 0 || (this.totalEsperado == 0 && this.totalRecebido == 0) ? true : false;
        });
      },500);
    });
  }
}
