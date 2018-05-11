import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';

import { ExpensesService } from './expenses.service';
import { ExpensesFormComponent } from './expenses-form/expenses-form.component';
import { ExpensesCreateComponent } from './expenses-create/expenses-create.component';
import { ExpensesEditorComponent } from './expenses-editor/expenses-editor.component';
import { ExpensesPrintComponent } from './expenses-print/expenses-print.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ExpensesRoutingModule
  ],
  declarations: [ExpensesComponent, ExpensesFormComponent, ExpensesCreateComponent, ExpensesEditorComponent, ExpensesPrintComponent],
  providers:[ExpensesService]
})
export class ExpensesModule { }
