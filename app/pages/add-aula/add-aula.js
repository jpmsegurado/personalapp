import {Page, NavController} from 'ionic-angular';
import {Aluno} from '../../providers/aluno/aluno';
import {Aula} from '../../providers/aula/aula';
import {DatePicker} from 'ionic-native';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl } from 'angular2/common';

@Page({
  templateUrl: 'build/pages/add-aula/add-aula.html'
})
export class AddAulaPage {
  static get parameters() {
    return [[NavController],[Aluno],[Aula],[FormBuilder]];
  }

  constructor(nav,AlunoService,AulaService,_builder) {
    this.nav = nav;
    this.AlunoService = AlunoService;
    this.AulaService = AulaService;
    this.AlunoService.getAll().subscribe((data) => {
      this.alunos = data;
    });


    this.aula = _builder.group({
      aluno: ['',Validators.required],
      dia: ['',Validators.required],
      'hora_inicio': ['',Validators.required],
      'hora_fim': ['',Validators.required],
      'preco_aula': ['',Validators.required],
      'preco_hora': ['',Validators.required]
    });

    this.aula.controls['dia'] = "Segunda";

    // this.aula = {
    //   aluno:-1,
    //   dia:"Segunda",
    //   hora_inicio:"",
    //   hora_fim:"",
    //   preco_aula:"",
    //   preco_hora:""
    // };
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

  onSubmit(value){
    console.log(value);
  }
  add(aula){
    for(var atr in aula){
      if((aula[atr] == undefined || aula[atr].length == 0) && window.cordova){
        navigator.notification.alert(
            'Há campos vazios, por favor preencha-os.',  // message
            function(){},         // callback
            'Atenção',            // title
            'ok'                  // buttonName
        );
        return;
      }else if((aula[atr] == undefined || aula[atr].length == 0) && !window.cordova){
        alert("Por favor, preencha os campos vazios.");
        return;
      }

    }

    this.AulaService.add(aula).subscribe(() => {
      this.nav.pop();
    });
  }

  pickDate(varToSave,type){
    DatePicker.show({
      date: new Date(),
      mode: type
    }).then(
      date => console.log("Got date: ", date),
      err => console.log("Error occurred while getting date:", err)
    );
  }

}
