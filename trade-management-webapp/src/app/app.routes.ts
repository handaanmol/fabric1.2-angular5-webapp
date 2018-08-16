import { TradeListComponent } from './trade-list/trade-list.component';
import { LandingComponent } from './landing/landing.component';
import { Routes } from '@angular/router';


export const ROUTES: Routes = [
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full'
    },
    {
        path: 'trade/list/:orgName',
        component: TradeListComponent,
        pathMatch: 'full'
    }
];
