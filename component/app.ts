import {Component} from 'angular2/core';
import {Router, RouteData, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl : `view/app.html`
})
@RouteConfig([
])

export class App {
    constructor() {
    }
}
