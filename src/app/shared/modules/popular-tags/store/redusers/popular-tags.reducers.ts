import {Action, createReducer, on} from '@ngrx/store';
import {PopularTagsStateInterface} from '../../types/popular-tags-state.interface';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/get-popular-tags.action';

const initialState: PopularTagsStateInterface = {
    isLoading: false,
    error: null,
    tags: null
};

const popularTagsReducer = createReducer(
    initialState,
    on(getPopularTagsAction,
        (state): PopularTagsStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(getPopularTagsSuccessAction,
        (state, action): PopularTagsStateInterface => ({
            ...state,
            isLoading: false,
            tags: action.tags
        })
    ),
    on(getPopularTagsFailureAction,
        (state): PopularTagsStateInterface => ({
            ...state,
            isLoading: false,
        })
    )
);

export function reducers(state: PopularTagsStateInterface, action: Action): object {
    return popularTagsReducer(state, action);
}
