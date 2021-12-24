import {ArticleInterface} from '../../../type/article.interface';

export interface GetFeedResponseInterface {
    articles: ArticleInterface[];
    articlesCount: number;
}
