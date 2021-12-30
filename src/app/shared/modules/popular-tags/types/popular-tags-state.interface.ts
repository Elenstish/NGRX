import {PopularTagType} from '../../../type/popular-tag.type';

export interface PopularTagsStateInterface {
    error: string | null;
    tags: PopularTagType[] | null;
}
