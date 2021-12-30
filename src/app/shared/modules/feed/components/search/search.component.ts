import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ArticleInterface} from '../../../../type/article.interface';
import {FormControl} from '@angular/forms';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() searchQuery = new EventEmitter();

    title = new FormControl();
    destroy$ = new Subject<boolean>();

    constructor() {
    }

    ngOnInit(): void {
        this.title.valueChanges.pipe(
            // filter(query => query.length > 2),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        ).subscribe((query) => {
            this.searchQuery.emit(query);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
