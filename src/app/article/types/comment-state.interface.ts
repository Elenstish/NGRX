import {CommentInterface} from '../../shared/modules/feed/types/comment.interface';

export interface CommentStateInterface {
    isLoading: boolean;
    error: string | null;
    comments: CommentInterface[] | null;
}
