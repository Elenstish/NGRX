import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../../type/popular-tag.type';
import {select, Store} from '@ngrx/store';
import {errorSelect, isLoadingSelect, popularTagsSelect} from '../../store/selectors/popular-tags.selector';
import {getPopularTagsAction} from '../../store/actions/get-popular-tags.action';

@Component({
    selector: 'app-popular-tags',
    templateUrl: './popular-tags.component.html',
    styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {
    popularTags$: Observable<PopularTagType[] | null>;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelect));
        this.error$ = this.store.pipe(select(errorSelect));
        this.popularTags$ = this.store.pipe(select(popularTagsSelect));
    }

    fetchData(): void {
        this.store.dispatch(getPopularTagsAction());
    }

}
