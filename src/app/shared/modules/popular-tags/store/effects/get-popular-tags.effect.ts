import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PopularTagsService} from '../../services/popular-tags.service';
import {PopularTagType} from '../../../../type/popular-tag.type';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/get-popular-tags.action';

@Injectable()

export class GetPopularTagsEffect {
    getPopularTags$ = createEffect(() => this.actions$.pipe(
        ofType(getPopularTagsAction),
        switchMap(() => {
            return this.popularTagsService.getPopularTags().pipe(
                map((tags: PopularTagType[]) => {
                    return getPopularTagsSuccessAction({tags});
                }),
                catchError(() => {
                    return of(getPopularTagsFailureAction());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private popularTagsService: PopularTagsService) {
    }
}
