///<reference path="../typings/github-electron/github-electron.d.ts"/>
import {Component, ElementRef, ViewChild, AfterViewInit} from 'angular2/core';
import {Router, RouteData, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {WebView} from "./webview";

declare var electron: Electron.ElectronMainAndRenderer;

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
        var appIcon = new electron.remote.Tray("icon.ico");
        var contextMenu = electron.remote.Menu.buildFromTemplate([
            { label: 'Exit', type: 'normal', click: this.onExit }
        ]);
        appIcon.setToolTip('This is my application.');
        appIcon.setContextMenu(contextMenu);
    }

    openLink = (url: string) => {
        electron.shell.openExternal(url);
    }

    onExit = () => {
        electron.remote.app.quit();
    }
}
