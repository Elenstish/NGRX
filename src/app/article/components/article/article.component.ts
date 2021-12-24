import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ArticleInterface} from '../../../shared/type/article.interface';
import {getArticleAction} from '../../store/actions/get-article.action';
import {
    articleSelect, commentSelect,
    errorCommentSelect,
    errorSelect,
    isLoadingCommentSelect,
    isLoadingSelect
} from '../../store/selectors/article-feature.selector';
import {ActivatedRoute} from '@angular/router';
import {CommentInterface} from '../../../shared/modules/feed/types/comment.interface';
import {getCommentAction} from '../../store/actions/get-comment.action';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
    isLoading$: Observable<boolean>;
    isLoadingComment$: Observable<boolean>;
    error$: Observable<string | null>;
    errorComment$: Observable<string | null>;
    comments$: Observable<CommentInterface[] | null>;
    article: ArticleInterface;
    destroy$ = new Subject<boolean>();
    slug: string;

    constructor(private store: Store,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
        this.fetchData();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelect));
        this.isLoadingComment$ = this.store.pipe(select(isLoadingCommentSelect));
        this.error$ = this.store.pipe(select(errorSelect));
        this.errorComment$ = this.store.pipe(select(errorCommentSelect));
        this.comments$ = this.store.pipe(select(commentSelect));
    }

    initializeListeners(): void {
        this.store
            .pipe(
                select(articleSelect),
                takeUntil(this.destroy$))
            .subscribe((article: ArticleInterface | null) => {
                this.article = article;
            });
    }

    fetchData(): void {
        this.store.dispatch(getArticleAction({slug: this.slug}));
        this.store.dispatch(getCommentAction({slug: this.slug}));
    }

}
