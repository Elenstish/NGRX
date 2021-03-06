import {AuthStateInterface} from '../../auth/types/auth-state.interface';
import {FeedStateInterface} from '../modules/feed/types/feed-state.interface';
import {ArticleStateInterface} from '../../article/types/article-state.interface';
import {PopularTagsStateInterface} from '../modules/popular-tags/types/popular-tags-state.interface';

export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
    article: ArticleStateInterface;
    tags: PopularTagsStateInterface;
}
