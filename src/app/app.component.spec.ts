import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app (async)', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should render title in a h2 tag (async)', async(() => {
        // Arrange

        // Act
        const compiled = fixture.debugElement.nativeElement;

        // Assert
        expect(compiled.querySelector('h2').textContent).toContain('Markdown Previewer');
    }));

    it(`should have initial params (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.rawText).toBeTruthy();
        expect(component.outputHTML).toBeTruthy();
    }));

    describe('#initApp', () => {
        it(`should init app with initial params (async)`, async(() => {
            // Arrange

            // Act
            component.initApp();

            // Assert
            // tslint:disable-next-line:max-line-length
            expect(component.rawText).toEqual(`Heading\n=======\n\nSub-heading\n-----------\n\n### Another deeper heading\n\nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**,\n\`monospace\`, ~~strikethrough~~ .\n\nShopping list:\n\n* apples\n* oranges\n* pears\n\nNumbered list:\n\n1. apples\n2. oranges\n3. pears\n\nAnd here's some code! :+1:\n\n\`\`\`javascript\n$(function(){\n  $('div').html('I am a div.');\n});\n\`\`\`\n\n\nThe rain---not the reign---in\nSpain.`);
            expect(component.outputHTML).toBeTruthy();
        }));
    });

    describe('#updateHtml', () => {
        it(`should update text with input (async)`, async(() => {
            // Arrange
            component.rawText = `Text attributes *italic*`;

            // Act
            component.updateHtml();

            // Assert
            expect(component.rawText).toEqual(`Text attributes *italic*`);
            expect(component.outputHTML).toEqual(`<p>Text attributes <em>italic</em></p>\n`);
        }));
    });

    describe('#ngDoCheck', () => {
        it(`should NOT change text if length was NOT changed (async)`, async(() => {
            // Arrange
            component.rawText = `Text attributes *italic*`;
            component.updateHtml();
            component.prevLength = component.rawText.length;

            // Act
            component.ngDoCheck();

            // Assert
            expect(component.rawText).toEqual(`Text attributes *italic*`);
            expect(component.outputHTML).toEqual(`<p>Text attributes <em>italic</em></p>\n`);
        }));

        it(`should change text if length was changed (async)`, async(() => {
            // Arrange
            component.rawText = `Text attributes *italic*`;
            component.prevLength = component.rawText.length;
            component.rawText += `.`;

            // Act
            component.ngDoCheck();

            // Assert
            expect(component.rawText).toEqual(`Text attributes *italic*.`);
            expect(component.outputHTML).toEqual(`<p>Text attributes <em>italic</em>.</p>\n`);
            expect(component.prevLength).toEqual(component.rawText.length);
        }));
    });
});
