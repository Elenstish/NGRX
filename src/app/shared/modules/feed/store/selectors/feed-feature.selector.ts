import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../../../type/app-state.interface';
import {FeedStateInterface} from '../../types/feed-state.interface';

export const feedFeatureSelector = createFeatureSelector<AppStateInterface, FeedStateInterface>('feed');

export const isLoadingSelect = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelect = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.error
);

export const feedSelect = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.data
);
