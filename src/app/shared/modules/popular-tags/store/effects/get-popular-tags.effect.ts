import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {PopularTagsService} from '../../services/popular-tags.service';
import {PopularTagType} from '../../../../type/popular-tag.type';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/get-popular-tags.action';
import {select, Store} from '@ngrx/store';
import {popularTagsSelect} from '../selectors/popular-tags.selector';
import {feedSelect} from '../../../feed/store/selectors/feed-feature.selector';

@Injectable()

export class GetPopularTagsEffect {
    getPopularTags$ = createEffect(() => this.actions$.pipe(
        ofType(getPopularTagsAction),
        debounceTime(3000),
        switchMap((fetchPopularTagsAction) => of(fetchPopularTagsAction)
            .pipe(
                withLatestFrom(this.store.pipe(select(feedSelect)), this.store.pipe(select(popularTagsSelect))),
                switchMap(([action, feedArray, popularTags]) => {
                    let uniqTags = [];
                    if (feedArray?.articles?.length > 0) {
                        const newFeed = feedArray.articles.map(el => el.tagList).join().split(',').filter(e => e);
                        uniqTags = [...new Set(newFeed)];
                    }
                    if (popularTags?.length > 0) {
                        return of(getPopularTagsSuccessAction({tags: popularTags}));
                    } else {
                        return this.popularTagsService.getPopularTags()
                            .pipe(
                                map((tags: PopularTagType[]) => {
                                    if (tags?.length === 0) {
                                        tags = uniqTags;
                                    }
                                    return getPopularTagsSuccessAction({tags});
                                }),
                                catchError(() => {
                                    return of(getPopularTagsFailureAction());
                                })
                            );
                    }
                })
            )
        )
    ));

    constructor(private actions$: Actions,
                private popularTagsService: PopularTagsService,
                private store: Store) {
    }
}
