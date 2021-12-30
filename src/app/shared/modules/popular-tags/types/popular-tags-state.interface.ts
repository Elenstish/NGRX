import {PopularTagType} from '../../../type/popular-tag.type';

export interface PopularTagsStateInterface {
    isLoading: boolean;
    error: string | null;
    tags: PopularTagType[] | null;
}
