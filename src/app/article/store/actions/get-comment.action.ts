import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {CommentInterface} from '../../../shared/modules/feed/types/comment.interface';

export const getCommentAction = createAction(
    ActionTypes.GET_COMMENT,
    props<{slug: string}>()
);

export const getCommentSuccessAction = createAction(
    ActionTypes.GET_COMMENT_SUCCESS,
    props<{comment: CommentInterface[]}>()
);

export const getCommentFailureAction = createAction(ActionTypes.GET_COMMENT_FAILURE);
