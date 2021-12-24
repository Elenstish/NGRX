import {ArticleStateInterface} from './article-state.interface';
import {CommentStateInterface} from './comment-state.interface';

export interface FullArticleStateInterface {
    article: ArticleStateInterface;
    comments: CommentStateInterface;
}
