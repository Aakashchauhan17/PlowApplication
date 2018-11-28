
import {NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {formRoutingModule} from '~/app/form/form.routes';
import {formComponent} from '~/app/form/form.component';
import {DrawingPad} from "nativescript-drawingpad";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("DrawingPad", () => require("nativescript-drawingpad").DrawingPad);


@NgModule({
    imports:[
        NativeScriptCommonModule,
        formRoutingModule
    ],
    declarations: [formComponent],
    providers: [
        DrawingPad
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class formModule{

}