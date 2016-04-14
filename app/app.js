import 'es6-shim';
import {App, Platform,MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';


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

  }
}
