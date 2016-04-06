///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser'
import {provide}    from "angular2/core";
import {App} from './component/app'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http';
import {Headers, BaseRequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Modal} from 'angular2-modal';

class CustomRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Accept': 'application/json'
    })
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Modal,
    provide(RequestOptions, { useClass: CustomRequestOptions })
]);