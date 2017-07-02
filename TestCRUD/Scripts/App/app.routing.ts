import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/home.component';
import { RegionsComponent } from './Components/regions.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'regions', component: RegionsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);