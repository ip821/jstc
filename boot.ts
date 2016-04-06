///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser'
import {App} from './component/app'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {Modal} from 'angular2-modal';

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS,Modal]);