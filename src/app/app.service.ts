import {Injectable} from 'angular2/core';
import {HmrState} from 'angular2-hmr';
const c = function(...args: any[]) {console.log.apply(console, arguments);};
@Injectable()
export class AppState {
  // HmrState uis used by HMR to track the any state during reloading
  @HmrState() _state = {};


  staging_000(data: any) {
      c('staging got primus data', Math.random(), data);
      this.counter ++;
      this.set('value', "yeah" + Math.random() + data.stuff + "counter: " + this.counter);
      if (data === 'falcon_ack') {
          c('stnahu');
          this.primus.write({
              success: true,
              actionGroup: 'main',
              type: '',
              params: {}
          });
      }
    }






  constructor() {
      this.counter = 0;
      const Primus = require('assets/primus.js');
      this.primus = new Primus;

      //
      this.primus.on('data', (data) => {

          this.staging_000(data);

      });
}








  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
