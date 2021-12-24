import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ArticleStateInterface} from '../../types/article-state.interface';
import {AppStateInterface} from '../../../shared/type/app-state.interface';
import {FullArticleStateInterface} from '../../types/full-article-state.interface';

export const articleFeatureSelector = createFeatureSelector<AppStateInterface, FullArticleStateInterface>('article');

export const isLoadingSelect = createSelector(
    articleFeatureSelector,
    (articleState: FullArticleStateInterface) => articleState.article.isLoading
);

export const isLoadingCommentSelect = createSelector(
    articleFeatureSelector,
    (commentState: FullArticleStateInterface) => commentState.comments.isLoading
);

export const errorSelect = createSelector(
    articleFeatureSelector,
    (articleState: FullArticleStateInterface) => articleState.article.error
);

export const errorCommentSelect = createSelector(
    articleFeatureSelector,
    (commentState: FullArticleStateInterface) => commentState.comments.error
);

export const articleSelect = createSelector(
    articleFeatureSelector,
    (articleState: FullArticleStateInterface) => articleState.article.article
);

export const commentSelect = createSelector(
    articleFeatureSelector,
    (commentState: FullArticleStateInterface) => commentState.comments.comments
);
