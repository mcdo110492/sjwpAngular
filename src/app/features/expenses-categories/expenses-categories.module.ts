import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { TitleBarModule } from './../title-bar/title-bar.module';

import { ExpensesCategoriesRoutingModule } from './expenses-categories-routing.module';
import { ExpensesCategoriesComponent } from './expenses-categories.component';

import { ExpensesCategoriesService } from './expenses-categories.service';
import { ExpensesCategoriesFormComponent } from './expenses-categories-form/expenses-categories-form.component';
import { ExpensesCategoriesCreateComponent } from './expenses-categories-create/expenses-categories-create.component';
import { ExpensesCategoriesEditorComponent } from './expenses-categories-editor/expenses-categories-editor.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ExpensesCategoriesRoutingModule
  ],
  declarations: [ExpensesCategoriesComponent, ExpensesCategoriesFormComponent, ExpensesCategoriesCreateComponent, ExpensesCategoriesEditorComponent],
  providers:[ExpensesCategoriesService]
})
export class ExpensesCategoriesModule { }
