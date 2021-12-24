import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleService} from '../../services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/get-article.action';
import {ArticleInterface} from '../../../shared/type/article.interface';

@Injectable()

export class GetCurrentArticleEffect {
    getCurrentArticle$ = createEffect(() => this.actions$.pipe(
        ofType(getArticleAction),
        switchMap(({slug}) => {
            return this.articleService.getCurrentArticle(slug).pipe(
                map((article: ArticleInterface) => {
                    return getArticleSuccessAction({article});
                }),
                catchError(() => {
                    return of(getArticleFailureAction());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private articleService: ArticleService) {
    }

}
