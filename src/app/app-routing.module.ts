import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';
import { SidenavComponent } from './main/sidenav/sidenav.component';

import { LoginComponent } from './login/login.component';

import { AuthGuardStateService } from './_services/auth-guard-state.service';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'login' },
 { path: 'login', component: LoginComponent, data: { animation: 'login' } },
 { path: 'main', component: MainComponent, data: { animation: 'main'},
   children: [
     { path: '', pathMatch: 'full', redirectTo: 'baptism' },
     { path: 'baptism', loadChildren: 'app/features/baptism/baptism.module#BaptismModule', canLoad:[AuthGuardStateService] },
     { path: 'confirmation', loadChildren: 'app/features/confirmation/confirmation.module#ConfirmationModule', canLoad:[AuthGuardStateService] },
     { path: 'death', loadChildren: 'app/features/death/death.module#DeathModule', canLoad:[AuthGuardStateService] },
     { path: 'marriage', loadChildren: 'app/features/marriage/marriage.module#MarriageModule', canLoad:[AuthGuardStateService] },
     { path: 'minister', loadChildren: 'app/features/minister/minister.module#MinisterModule', canLoad:[AuthGuardStateService] },
     { path: 'services/categories', loadChildren: 'app/features/services-categories/services-categories.module#ServicesCategoriesModule', canLoad:[AuthGuardStateService] },
     { path: 'services/type', loadChildren: 'app/features/services-type/services-type.module#ServicesTypeModule', canLoad:[AuthGuardStateService] },
     { path: 'sales/pos', loadChildren: 'app/features/pos/pos.module#PosModule', canLoad:[AuthGuardStateService] },
     { path: 'sales/list', loadChildren: 'app/features/sales/sales.module#SalesModule', canLoad:[AuthGuardStateService] },
     { path: 'sales/report', loadChildren: 'app/features/sales-report/sales-report.module#SalesReportModule', canLoad:[AuthGuardStateService] },
     { path: 'expenses/categories', loadChildren: 'app/features/expenses-categories/expenses-categories.module#ExpensesCategoriesModule', canLoad:[AuthGuardStateService] },
     { path: 'expenses/list', loadChildren: 'app/features/expenses/expenses.module#ExpensesModule', canLoad:[AuthGuardStateService] },
     { path: 'expenses/type', loadChildren: 'app/features/expenses-type/expenses-type.module#ExpensesTypeModule', canLoad:[AuthGuardStateService] },
     { path: 'expenses/report', loadChildren: 'app/features/expenses-report/expenses-report.module#ExpensesReportModule', canLoad:[AuthGuardStateService] },
     { path: 'profile', loadChildren: 'app/features/user-profile/user-profile.module#UserProfileModule', canLoad:[AuthGuardStateService] },
   ]
 },
];

export const PrimaryRouteComponents = [
  MainComponent,
  ToolbarComponent,
  SidenavComponent,
  LoginComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
