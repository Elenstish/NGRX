import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from '../../store/actions/get-feed.action';
import {Observable} from 'rxjs';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';
import {errorSelect, feedSelect, isLoadingSelect} from '../../store/selectors/feed-feature.selector';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlProps: string;

    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    feed$: Observable<GetFeedResponseInterface | null>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelect));
        this.error$ = this.store.pipe(select(errorSelect));
        this.feed$ = this.store.pipe(select(feedSelect));
    }

    fetchData(): void {
        this.store.dispatch(getFeedAction({url: this.apiUrlProps}));
    }

}
