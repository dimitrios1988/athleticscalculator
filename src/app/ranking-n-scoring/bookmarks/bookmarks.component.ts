import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './entities/bookmark.entity';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  public bookmarks: Bookmark[];

  constructor(private bookmarksService: BookmarksService) {
    this.bookmarks = bookmarksService.getBookmarks();
   }

  ngOnInit() {
    console.log(this.bookmarks[0].eventForm.controls.performancePoints.value);
  }

}
