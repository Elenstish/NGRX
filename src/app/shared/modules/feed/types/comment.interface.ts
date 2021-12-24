import {ProfileInterface} from '../../../type/profile.interface';

export interface CommentInterface {
    author: ProfileInterface;
    body: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}
