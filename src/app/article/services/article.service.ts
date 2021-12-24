import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GetArticleResponseInterface} from '../types/get-article-response.interface';
import {ArticleInterface} from '../../shared/type/article.interface';
import {map} from 'rxjs/operators';
import {GetCommentResponseInterface} from '../types/get-comment-response.interface';
import {CommentInterface} from '../../shared/modules/feed/types/comment.interface';

@Injectable()

export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }

  getComments(response: GetCommentResponseInterface): CommentInterface[] {
    return response.comments;
  }

  getCurrentArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles/' + slug;
    return this.http.get<GetArticleResponseInterface>(fullUrl).pipe(map(this.getArticle));
  }

  getComment(slug: string): Observable<CommentInterface[]> {
    const fullUrl = environment.apiUrl + '/articles/' + slug + '/comments';
    return this.http.get<GetCommentResponseInterface>(fullUrl).pipe(map(this.getComments));
  }
}
