import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleComponent} from './components/article/article.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {ErrorMessageModule} from '../shared/modules/error-message/error-message.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {ArticleService} from './services/article.service';
import {EffectsModule} from '@ngrx/effects';
import {GetCurrentArticleEffect} from './store/effects/get-current-article.effect';
import {ArticleCommentComponent} from './components/article-comment/article-comment.component';
import {reducers} from './store/redusers/article-module.reducers';
import {GetCommentEffect} from './store/effects/get-comment.effect';

const routes: Routes = [
    {
        path: 'article/:slug',
        component: ArticleComponent
    },
];

@NgModule({
    declarations: [ArticleComponent, ArticleCommentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('article', reducers),
        EffectsModule.forFeature([GetCurrentArticleEffect, GetCommentEffect]),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
        BannerModule
    ],
    providers: [ArticleService]
})
export class ArticleModule {
}
