import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/feed/feed.component';
import {GetFeedEffect} from './store/effects/get-feed.effect';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/redusers/feed.reducers';
import {FeedService} from './services/feed.service';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../error-message/error-message.module';
import {LoadingModule} from '../loading/loading.module';
import {TagListModule} from '../tag-list/tag-list.module';
import {SearchComponent} from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
    declarations: [FeedComponent, SearchComponent, SearchPipe],
    imports: [
        CommonModule,
        StoreModule.forFeature('feed', reducers),
        EffectsModule.forFeature([GetFeedEffect]),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
        TagListModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [FeedComponent],
    providers: [FeedService]
})
export class FeedModule {
}
