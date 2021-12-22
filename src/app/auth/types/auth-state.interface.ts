import {CurrentUserInterface} from '../../shared/type/current-user.interface';
import {BackendErrorsInterface} from '../../shared/type/backend-errors.interface';

export interface AuthStateInterface {
    isSubmitting: boolean;
    isLoading: boolean;
    currentUser: CurrentUserInterface | null;
    isLoggedIn: boolean | null;
    validationErrors: BackendErrorsInterface | null;
}
