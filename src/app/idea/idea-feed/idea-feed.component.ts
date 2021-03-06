import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  isLoading = false;
  @Input('data')
  collection: any = [];
  totalCount = 20;
  pageIndex = 1;
  constructor(private ideaService: IdeaService, private router: Router, private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
    this.getCurrentPagesIdeas(1);
  }

  getIdeaFeed() {}

  getCurrentPagesIdeas(pageIndex: number) {
    this.pageIndex = pageIndex;
    const ideasPerPage = 5;
    const startIndexOfCurrentPage = (pageIndex - 1) * ideasPerPage + 1;
    this.ideaService
      .getNIdeas(startIndexOfCurrentPage.toString())
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.router.navigate(['not-found']);
          }
          console.log(data);
          this.collection = data;
          this.isLoading = true;
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
}
