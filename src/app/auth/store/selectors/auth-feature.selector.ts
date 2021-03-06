import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/type/app-state.interface';
import {AuthStateInterface} from '../../types/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelect = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isLoggedIn
);

export const isAnonymousSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isLoggedIn === false
);

export const isCurrentUserSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.currentUser
);
