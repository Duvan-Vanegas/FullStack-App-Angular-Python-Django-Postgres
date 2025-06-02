import { provideRouter, Routes } from '@angular/router';

import { Home } from './home/home';
import { Department } from './department/department';
import { Employee } from './employee/employee';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'department', loadComponent: () => import('./department/department').then(m => m.Department) },
    { path: 'employee', loadComponent: () => import('./employee/employee').then(m => m.Employee) }
];
