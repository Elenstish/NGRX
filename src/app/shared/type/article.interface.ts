import {ProfileInterface} from './profile.interface';
import {CommentInterface} from '../modules/feed/types/comment.interface';

export interface ArticleInterface {
    author: ProfileInterface;
    body: string;
    comments?: CommentInterface[];
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
}
