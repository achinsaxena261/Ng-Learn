import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './Components/user.component';

const appRoutes : Routes = [
    {
        path : '',
        component : UserComponent
    }
]

export const Routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);