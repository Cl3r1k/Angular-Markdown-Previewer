import { Component, OnInit, DoCheck } from '@angular/core';
import * as _marked from 'marked';
// import * as _marked from 'your-library';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

    rawText: string;
    outputHTML: string;
    prevLength: number;

    constructor() {
        this.initApp();
    }

    ngOnInit() {
        const el = document.getElementById('loader-wrapper');
        if (el) {
            el.classList.add('loaded');
        }
    }

    initApp() {
        // tslint:disable-next-line:max-line-length
        this.rawText = `Heading\n=======\n\nSub-heading\n-----------\n\n### Another deeper heading\n\nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**,\n\`monospace\`, ~~strikethrough~~ .\n\nShopping list:\n\n* apples\n* oranges\n* pears\n\nNumbered list:\n\n1. apples\n2. oranges\n3. pears\n\nAnd here's some code! :+1:\n\n\`\`\`javascript\n$(function(){\n  $('div').html('I am a div.');\n});\n\`\`\`\n\n\nThe rain---not the reign---in\nSpain.`;

        this.updateHtml();
    }

    updateHtml() {
        this.outputHTML = _marked(this.rawText);
    }

    ngDoCheck() {
        if (this.rawText.length !== this.prevLength) {
            this.updateHtml();
            this.prevLength = this.rawText.length;
        }
    }
}
