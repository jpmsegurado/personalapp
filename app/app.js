import 'es6-shim';
import {App, Platform,MenuController,SqlStorage,Storage,LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AddAulaPage} from './pages/add-aula/add-aula';
import {Facebook} from 'ionic-native';
import {Aluno} from './providers/aluno/aluno';
import {Aula} from './providers/aula/aula';
import {Mask} from './components/mask/mask';
import PouchDB from '../node_modules/pouchdb/dist/pouchdb';


@App({
  templateUrl: 'build/pages/app.html',
  config: {tabbarPlacement: 'bottom'},
  diretives:[Mask],
  providers : [Aluno,Aula]
})
export class MyApp {
  static get parameters() {
    return [[Platform,MenuController]];
  }

  constructor(platform,menu) {
    this.rootPage = TabsPage;
    this.menu = menu;
    this.local = new Storage(LocalStorage);

  }

  login(){
    if(this.local.get("userId") != undefined){
      Facebook.api("/me",['email','public_profile']).then((resp) => {

      });

      return;
    }
    Facebook.login(['email','public_profile']).then((data) => {
        this.local.set("userId",data.authResponse.userID);
        this.local.set("userEmail","jpmsegurado@gmail.com");
        // var credentials = {
        //   email : "user@stamplay.com",
        //   password : "my_password"
        // }
        //
        // Stamplay.User.signup(credentials)
        //   .then(function(res) {
        //     console.log(res);
        //   }, function(err) {
        //     // error
        //   });
      }, (...args) => {
        console.log(args);
      });



  }
}
