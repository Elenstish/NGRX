import {AuthStateInterface} from '../../auth/types/auth-state.interface';
import {FeedStateInterface} from '../modules/feed/types/feed-state.interface';
import {ArticleStateInterface} from '../../article/types/article-state.interface';

export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
    article: ArticleStateInterface;
}
