import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FeedService} from '../../services/feed.service';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/get-feed.action';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';
import {select, Store} from '@ngrx/store';
import {feedSelect} from '../selectors/feed-feature.selector';

@Injectable()

export class GetFeedEffect {
    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(getFeedAction),
        switchMap((fetchFeedAction) => of(fetchFeedAction)
            .pipe(
                withLatestFrom(this.store.pipe(select(feedSelect))),
                switchMap(([action, feedArray]) => {
                    if (feedArray) {
                        return of(getFeedSuccessAction({feed: feedArray}));
                    } else {
                        return this.feedService.getFeed(action.url).pipe(
                            map((feed: GetFeedResponseInterface) => {
                                return getFeedSuccessAction({feed});
                            }),
                            catchError(() => {
                                return of(getFeedFailureAction());
                            })
                        );
                    }
                })
            )
        )
    ));

    constructor(private actions$: Actions,
                private feedService: FeedService,
                private store: Store) {
    }
}
