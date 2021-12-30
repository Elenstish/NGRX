import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import {RouterModule, Routes} from '@angular/router';
import {FeedModule} from '../shared/modules/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent
  },
];

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [
    CommonModule,
    FeedModule,
    RouterModule.forChild(routes),
    BannerModule,
    PopularTagsModule
  ]
})
export class GlobalFeedModule { }
