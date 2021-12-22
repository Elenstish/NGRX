import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/type/current-user.interface';
import {of} from 'rxjs';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/get-current-user.action';

@Injectable()

export class GetCurrentUserEffect {
    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.persistanceService.get('accessToken');
            if (!token) {
                return of(getCurrentUserFailureAction());
            }
            return this.authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return getCurrentUserSuccessAction({currentUser});
                }),
                catchError(() => {
                    return of(getCurrentUserFailureAction());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private authService: AuthService,
                private persistanceService: PersistanceService) {
    }

}
