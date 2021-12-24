import {articleReducerFn, commentsReducerFn} from './article.reducers';
import {ActionReducerMap} from '@ngrx/store';
import {FullArticleStateInterface} from '../../types/full-article-state.interface';

export const reducers: ActionReducerMap<FullArticleStateInterface> = {
    article: articleReducerFn,
    comments: commentsReducerFn,
};
