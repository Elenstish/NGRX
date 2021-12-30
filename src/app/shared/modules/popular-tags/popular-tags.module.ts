import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopularTagsComponent} from './components/popular-tags/popular-tags.component';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../error-message/error-message.module';
import {PopularTagsService} from './services/popular-tags.service';
import {EffectsModule} from '@ngrx/effects';
import {GetPopularTagsEffect} from './store/effects/get-popular-tags.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/redusers/popular-tags.reducers';

@NgModule({
    declarations: [PopularTagsComponent],
    imports: [
        CommonModule,
        RouterModule,
        ErrorMessageModule,
        EffectsModule.forFeature([GetPopularTagsEffect]),
        StoreModule.forFeature('tags', reducers),
    ],
    exports: [PopularTagsComponent],
    providers: [PopularTagsService]
})
export class PopularTagsModule {
}
