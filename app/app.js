import 'es6-shim';
import {App, Platform,MenuController,SqlStorage,Storage,LocalStorage} from 'ionic-angular';
import {StatusBar,Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AddAulaPage} from './pages/add-aula/add-aula';
import {Facebook} from 'ionic-native';
import {Grupo} from './providers/grupo/grupo';
import {Mask} from './components/mask/mask';
import {IntroPage} from './pages/intro/intro';
import PouchDB from '../node_modules/pouchdb/dist/pouchdb';


@App({
  templateUrl: 'build/pages/app.html',
  config: {tabbarPlacement: 'bottom'},
  diretives:[Mask],
  providers : [Grupo]
})
export class MyApp {
  static get parameters() {
    return [[Platform,MenuController]];
  }

  constructor(platform,menu) {
    this.menu = menu;
    this.platform = platform;
    this.rootPage = TabsPage;
    this.local = new Storage(LocalStorage);
    this.local.get('novousuario').then((result) => {
        this.rootPage = result ? TabsPage : IntroPage;
        if(!result){
            this.local.set('novousuario', true);
        }

    });

    // if(window.cordova){
    //   let app = {
    //     initialize: function() {
    //         document.addEventListener('deviceready', app.onDeviceReady, false);
    //     }
    //   };
    //   app.initialize();
    // }
  }

  ngOnInit(){
    Splashscreen.hide();
  }
}
