import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {registerAction} from '../../store/actions';
import {isSubmittingSelect, validationErrorsSelector} from '../../store/selectors';
import {RegisterRequestInterface} from '../../types/register-request.interface';
import {BackendErrorsInterface} from '../../../shared/type/backend-errors.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    isSubmitting$: Observable<boolean>;
    backendErrors$: Observable<BackendErrorsInterface | null>;

    constructor(private fb: FormBuilder,
                private store: Store) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: [''],
            password: ['']
        });
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelect));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    onSubmit(): void {
        const request: RegisterRequestInterface = {
            user: this.form.value
        };
        this.store.dispatch(registerAction({request}));
    }

}
