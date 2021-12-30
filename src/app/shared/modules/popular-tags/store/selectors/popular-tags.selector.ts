import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../../../type/app-state.interface';
import {PopularTagsStateInterface} from '../../types/popular-tags-state.interface';

export const popularTagsFeatureSelector = createFeatureSelector<AppStateInterface, PopularTagsStateInterface>('tags');

export const isLoadingSelect = createSelector(
    popularTagsFeatureSelector,
    (feedState: PopularTagsStateInterface) => feedState.isLoading
);

export const errorSelect = createSelector(
    popularTagsFeatureSelector,
    (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);

export const popularTagsSelect = createSelector(
    popularTagsFeatureSelector,
    (popularTagsState: PopularTagsStateInterface) => popularTagsState.tags
);
