import {Page, NavController} from 'ionic-angular';
import {Aluno} from '../../providers/aluno/aluno';
import {Aula} from '../../providers/aula/aula';
import {DatePicker} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/add-aula/add-aula.html'
})
export class AddAulaPage {
  static get parameters() {
    return [[NavController],[Aluno],[Aula]];
  }

  constructor(nav,AlunoService,AulaService) {
    this.nav = nav;
    this.AlunoService = AlunoService;
    this.AulaService = AulaService;
    this.AlunoService.getAll().subscribe((data) => {
      console.log(data);
      this.alunos = data;
    });


    this.aula = {
      alunoId:-1,
      dia:"Segunda",
      hora_inicio:"",
      hora_fim:"",
      preco_aula:"",
      preco_hora:""
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


  change(aula){
    let alunoIndex = this.AlunoService._findIndex(this.alunos,aula.alunoId);
    aula.aluno = this.alunos[alunoIndex];
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
      // this.nav.pop();
    });
  }

  pickDate(){
    DatePicker.show({
      date: new Date(),
      mode: 'time'
    }).then(
      date => console.log("Got date: ", date),
      err => console.log("Error occurred while getting date:", err)
    );
  }

}
