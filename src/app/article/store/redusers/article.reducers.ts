import {Action, createReducer, on} from '@ngrx/store';
import {ArticleStateInterface} from '../../types/article-state.interface';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/get-article.action';
import {getCommentAction, getCommentFailureAction, getCommentSuccessAction} from '../actions/get-comment.action';
import {CommentStateInterface} from '../../types/comment-state.interface';

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    article: null
};

const initialCommentState: CommentStateInterface = {
    isLoading: false,
    error: null,
    comments: null
};

const articleReducer = createReducer(
    initialState,
    on(getArticleAction,
        (state): ArticleStateInterface => ({
            ...state,
            isLoading: true,
            article: null
        })
    ),
    on(getArticleSuccessAction,
        (state, action): ArticleStateInterface => ({
            ...state,
            isLoading: false,
            article: action.article
        })
    ),
    on(getArticleFailureAction,
        (state): ArticleStateInterface => ({
            ...state,
            isLoading: false,
        })
    )
);

const commentsReducer = createReducer(
    initialCommentState,
    on(getCommentAction,
        (state): CommentStateInterface => ({
            ...state,
            isLoading: true,
            comments: null
        })
    ),
    on(getCommentSuccessAction,
        (state, action): CommentStateInterface => ({
            ...state,
            isLoading: false,
            comments: action.comment
        })
    ),
    on(getCommentFailureAction,
        (state): CommentStateInterface => ({
            ...state,
            isLoading: false,
        })
    )
);

export function articleReducerFn(state: ArticleStateInterface, action: Action): ArticleStateInterface {
    return articleReducer(state, action);
}

export function commentsReducerFn(state: CommentStateInterface, action: Action): CommentStateInterface {
    return commentsReducer(state, action);
}
