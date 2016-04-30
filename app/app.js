import 'es6-shim';
import {App, Platform,MenuController,SqlStorage,Storage,LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Facebook} from 'ionic-native';
// import PouchDB from '../../node_modules/pouchdb/dist/pouchdb';


@App({
  templateUrl: 'build/pages/app.html',
  config: {tabbarPlacement: 'bottom'} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform,MenuController]];
  }

  constructor(platform,menu) {
    this.rootPage = TabsPage;
    this.menu = menu;
    this.local = new Storage(LocalStorage);

    // let initQuery = "CREATE TABLE IF NOT EXISTS aluno";
    // initQuery = initQuery + ("(");
    // initQuery = initQuery + ("id INTEGER PRIMARY KEY AUTOINCREMENT,");
    // initQuery = initQuery + ("nome text,");
    // initQuery = initQuery + ("email text,");
    // initQuery = initQuery + ("nascimento text,");
    // initQuery = initQuery + ("telefone text,");
    // initQuery = initQuery + ("peso int(3),");
    // initQuery = initQuery + ("altura int(3),");
    // initQuery = initQuery + ("objetivo text");
    // initQuery = initQuery + (");");
    //
    // initQuery = initQuery + ("CREATE TABLE IF NOT EXISTS aula");
    // initQuery = initQuery + ("(");
    // initQuery = initQuery + ("id INTEGER PRIMARY KEY AUTOINCREMENT,");
    // initQuery = initQuery + ("id_aluno INTEGER,");
    // initQuery = initQuery + ("dia int(1),");
    // initQuery = initQuery + ("FOREIGN KEY(id_aluno) REFERENCES aluno(id)");
    // initQuery = initQuery + (");");
    //
    // this.storage = new Storage(SqlStorage);
    //
    // this.storage.query(initQuery).then((data) => {
    //   console.log("TABLE CREATED -> " + JSON.stringify(data.res));
    // }, (error) => {
    //   console.log("ERROR -> " + JSON.stringify(error.err));
    // });

    var db = new PouchDB('dbname');

    // db.put({
    //   _id: 'dave@gmail.com',
    //   name: 'David',
    //   age: 69
    // });
    //
    // db.changes().on('change', function() {
    //   console.log('Ch-Ch-Changes');
    // });

  }

  login(){
    Facebook.login(['public_profile', 'user_birthday']).then((data) => {
        console.log(data.authResponse.userID);
        this.local.set("userId",data.authResponse.userID);
      }, (...args) => {
        console.log(args);
      });
  }
}
