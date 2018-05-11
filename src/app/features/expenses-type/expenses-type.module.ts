import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { TitleBarModule } from './../title-bar/title-bar.module';

import { ExpensesTypeRoutingModule } from './expenses-type-routing.module';
import { ExpensesTypeComponent } from './expenses-type.component';

import { ExpensesTypeService } from './expenses-type.service';
import { ExpensesTypeFormComponent } from './expenses-type-form/expenses-type-form.component';
import { ExpensesTypeCreateComponent } from './expenses-type-create/expenses-type-create.component';
import { ExpensesTypeEditorComponent } from './expenses-type-editor/expenses-type-editor.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ExpensesTypeRoutingModule
  ],
  declarations: [ExpensesTypeComponent, ExpensesTypeFormComponent, ExpensesTypeCreateComponent, ExpensesTypeEditorComponent],
  providers:[ExpensesTypeService]
})
export class ExpensesTypeModule { }
