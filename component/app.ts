///<reference path="../typings/github-electron/github-electron.d.ts"/>
import {Component, ElementRef, ViewChild, AfterViewInit} from 'angular2/core';
import {Router, RouteData, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {WebView} from "./webview";

declare var electron: Electron.CommonElectron;

@Component({
    selector: 'my-app',
    providers: [WebView],
    directives: [ROUTER_DIRECTIVES, WebView],
    templateUrl: `view/app.html`
})
@RouteConfig([
])

export class App implements AfterViewInit {
    @ViewChild(WebView) _webView: WebView;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        this._webView.eventOnLinkClicked.subscribe(e => this.openLink(e.url));
    }

    openLink = (url: string) => {
        console.log("asd");
        electron.shell.openExternal(url);
    }
}
