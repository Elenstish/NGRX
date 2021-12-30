import { Pipe, PipeTransform } from '@angular/core';
import {ArticleInterface} from '../../../type/article.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(value: ArticleInterface[], args?: string): ArticleInterface[] {
        if (!args) {
            return value;
        } else {
            return value.filter(item =>
                item.title.toUpperCase().indexOf(args.toUpperCase()) !== -1);
        }
    }

}
