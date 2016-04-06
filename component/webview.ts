import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from 'angular2/core';

interface OnLinkClickedArgs {
    url: string
}

@Component({
    selector: 'tc-webview',
    templateUrl: `view/webview.html`
})
export class WebView {
    public eventOnLinkClicked: EventEmitter<OnLinkClickedArgs> = new EventEmitter();
    @ViewChild("webview") _webViewRaw: any;

    constructor(private _element: ElementRef) {
    }

    ngOnInit() {
        $(this._element.nativeElement).find("webview").on("new-window", this.onLinkClicked);
    }

    onLinkClicked = (e: any) => {
        this.eventOnLinkClicked.emit({ url: e.originalEvent.url });
    }
}