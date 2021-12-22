import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import {RegisterComponent} from './components/register/register.component';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './store/reducers';
import {RegisterEffect} from './store/effects';
import {AuthService} from './services/auth.service';
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module';
import {PersistanceService} from '../shared/services/persistance.service';
import {LoginEffect} from './store/effects/login.effect';
import { LoginComponent } from './components/login/login.component';
import {GetCurrentUserEffect} from './store/effects/get-current-user.effect';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
        BackendErrorMessagesModule
    ],
    providers: [AuthService, PersistanceService]
})
export class AuthModule {
}
