import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/user.component';
import { ClassComponent } from './Components/class.component';
import { forumComponent } from './Components/forum.component';

const appRoutes : Routes = [
    {
        path : '',
        component : UserComponent
    },
    {
        path : 'classroom',
        component : ClassComponent
    },
    {
        path : 'connect',
        component : forumComponent
    }    
]

export const Routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);