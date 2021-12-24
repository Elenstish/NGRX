import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from '../../../shared/modules/feed/types/comment.interface';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit {
  @Input('comment') commentProps: CommentInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
