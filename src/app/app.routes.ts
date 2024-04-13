import { Routes } from '@angular/router';
import { AddPasswordComponent } from './pages/add-password/add-password.component';
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ViewPasswordComponent } from './pages/view-password/view-password.component';

export const routes: Routes = [
    {path:'*',redirectTo:'/dashboard',pathMatch:'full'},
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'categories',
                component: PasswordsComponent,
            },
            {
                path: 'add-password',
                component: AddPasswordComponent,
            },
            {
                path: 'view-password/:id',
                component: ViewPasswordComponent,
            }
        ]
    },
];
