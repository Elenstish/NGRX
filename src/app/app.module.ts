import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {TopBarModule} from './shared/modules/top-bar/top-bar.module';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';
import {PersistanceService} from './shared/services/persistance.service';
import {GlobalFeedModule} from './global-feed/global-feed.module';
import {ArticleModule} from './article/article.module';
import {YourFeedModule} from './your-feed/your-feed.module';
import {TagFeedModule} from './tag-feed/tag-feed.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        GlobalFeedModule,
        YourFeedModule,
        TagFeedModule,
        HttpClientModule,
        TopBarModule,
        ArticleModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
    ],
    providers: [
        PersistanceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
