///<reference path="../typings/github-electron/github-electron.d.ts"/>
import {Component, ElementRef, EventEmitter, AfterViewInit, ViewChild, ContentChild} from 'angular2/core';
import {Http} from "angular2/http"

declare var electron: Electron.ElectronMainAndRenderer;

interface OnLinkClickedArgs {
    url: string
}

@Component({
    selector: 'tc-webview',
    templateUrl: `view/webview.html`
})
export class WebView implements AfterViewInit {
    public eventOnLinkClicked: EventEmitter<OnLinkClickedArgs> = new EventEmitter();
    _webViewElement: JQuery;

    constructor(private _element: ElementRef, private _http: Http) {
    }

    ngAfterViewInit() {
        this._webViewElement = $(this._element.nativeElement).find("webview");
        this._webViewElement.on("dom-ready", this.onReady);
        this._webViewElement.attr("src", "http://172.22.2.28:8082/win32/userStatus.html?small=1");
    }

    onReady = () => {
        this._http
        .get("http://172.22.2.28:8082/httpAuth/app/rest/projects").toPromise()
        .then(res => console.log(res.json()));
        this._webViewElement.on("new-window", this.onLinkClicked);
    }

    onLinkClicked = (e: any) => {
        this.eventOnLinkClicked.emit({ url: e.originalEvent.url });
    }
}