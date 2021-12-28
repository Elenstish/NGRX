import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleService} from '../../services/article.service';
import {getCommentAction, getCommentFailureAction, getCommentSuccessAction} from '../actions/get-comment.action';
import {CommentInterface} from '../../../shared/modules/feed/types/comment.interface';

@Injectable()

export class GetCommentEffect {
    getComment$ = createEffect(() => this.actions$.pipe(
        ofType(getCommentAction),
        switchMap(({slug}) => {
            return this.articleService.getArticleComments(slug).pipe(
                map((comment: CommentInterface[]) => {
                    return getCommentSuccessAction({comment});
                }),
                catchError(() => {
                    return of(getCommentFailureAction());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private articleService: ArticleService) {
    }

}
