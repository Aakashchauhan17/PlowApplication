import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import {formComponent} from '~/app/form/form.component'

export const routes: Routes = [
    { path: '', component:formComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]

})
export class formRoutingModule{}