/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home';
import {AdminCreateWorld} from './adminCreateWorld';
import {Sports_000} from './sports_000';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

const c = function(...args: any[]) {console.log.apply(console, arguments);};
import * as _ from 'lodash';
const shortid = require('shortid');
const uuid = require('node-uuid');


// const Primus = require('assets/primus.js');
// var primus = new Primus;
// //
// primus.on('data', (data) => {
//   c('primus got data', data);
//   if (data === 'falcon_ack') {
//       c('stnahu');
//       primus.write({
//           success: true,
//           actionGroup: 'main',
//           type: 'RazorGrip',
//           params: {}
//       });
//   }
// });
//
// // primus.write({
// //     success: true,
// //     actionGroup: 'main',
// //     type: 'RazorGrip',
// //     params: {}
// // });
//
// primus.write({
//     success: true,
//     event_type: "league_init",
//     name: "FLYING BANDITS"
// });

// setInterval(() => {
//     primus.write({
//             success: true,
//             actionGroup: 'alternate',
//             type: 'falcon',
//             payload: {whatever: 'it takes'}
//     });
// }, 3000);



/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    nav ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    nav li {
      display: inline;
    }
    nav li.active {
      background-color: lightgray;
    }
  `],
  template: `
    <header>
      <nav>
        <h1>HOLA {{ name }}</h1>
        <ul>
          <li router-active>
            <a [routerLink]=" ['Index'] ">Index</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['Home'] ">Home</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['AdminCreateWorld'] ">AdminCreateWorld</a>
          </li>

          <li router-active>
            <a [routerLink]=" ['Sports_000'] ">Sports_000</a>
          </li>
          <li router-active>
            <a [routerLink]=" ['About'] ">About</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>

      <div>
        <img [src]="angularclassLogo" width="10%">
      </div>
      <div>
        <img [src]="scalar_000_logo" width="20%">
      </div>
    </footer>

    <pre>this.appState.stateeeeeeeeee = {{ appState.state | json }}</pre>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/sports_000', name: 'Sports_000', component: Sports_000},
  { path: '/adminCreateWorld', name: 'AdminCreateWorld', component: AdminCreateWorld},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
    scalar_000_logo = 'assets/img/scalar_000_.png';
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'LaCoste Wagers';
  url = 'blah';
  comment_000 = "it's a component.";

  constructor(public appState: AppState) {

      // it's expecting something of type AppState to be provided at
      // instantiation. 
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
