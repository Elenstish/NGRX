import {ArticleInterface} from '../../shared/type/article.interface';

export interface ArticleStateInterface {
    isLoading: boolean;
    error: string | null;
    article: ArticleInterface | null;
}
