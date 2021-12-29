import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
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
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommentInterface} from '../../../shared/modules/feed/types/comment.interface';
import {getCommentAction} from '../../store/actions/get-comment.action';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

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
    commentsBase: CommentInterface[] = [];
    comments: CommentInterface[] = [];
    article$: Observable<ArticleInterface | null>;
    destroy$ = new Subject<boolean>();
    slug: string;
    limit = environment.limit;
    baseUrl: string;
    currentPage: number;

    constructor(private store: Store,
                private route: ActivatedRoute,
                private router: Router) {
        this.getParams();
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

    getParams(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: Params) => {
                this.currentPage = Number(params?.page || '1');
                if (this.commentsBase?.length > 0) {
                    this.fetchComments();
                }
            });
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelect));
        this.isLoadingComment$ = this.store.pipe(select(isLoadingCommentSelect));
        this.error$ = this.store.pipe(select(errorSelect));
        this.errorComment$ = this.store.pipe(select(errorCommentSelect));
        this.article$ = this.store.pipe(select(articleSelect));
        this.baseUrl = this.router.url.split('?')[0];
    }

    initializeListeners(): void {
        this.store
            .pipe(
                select(commentSelect),
                takeUntil(this.destroy$)
            )
            .subscribe((comments: CommentInterface[]) => {
                this.commentsBase = comments;
                if (this.commentsBase?.length > 0) {
                    this.fetchComments();
                }
            });
    }

    fetchData(): void {
        this.store.dispatch(getArticleAction({slug: this.slug}));
        this.store.dispatch(getCommentAction({slug: this.slug}));
    }

    fetchComments(): void {
        const offset = this.currentPage * this.limit - this.limit;
        const end = offset + this.limit;
        this.comments = this.commentsBase.slice(offset, end);
    }

}
