import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FeedService} from '../../services/feed.service';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/get-feed.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';

@Injectable()

export class GetFeedEffect {
    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(getFeedAction),
        switchMap(({url}) => {
            return this.feedService.getFeed(url).pipe(
                map((feed: GetFeedResponseInterface) => {
                    return getFeedSuccessAction({feed});
                }),
                catchError(() => {
                    return of(getFeedFailureAction());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private feedService: FeedService) {
    }
}
