import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './entities/bookmark.entity';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  private bookmarks: Bookmark[];
  public dataSource: MatTableDataSource<Bookmark>;
  public displayedColumns: string[];

  constructor(private bookmarksService: BookmarksService) {
    this.displayedColumns = [
      'Icon', 'Name', 'Event', 'Date', 'TotalPoints', 'More'
    ];
    this.dataSource = new MatTableDataSource();
    this.bookmarks = bookmarksService.getBookmarks();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bookmarks);
  }

  onDelete(bookmark: Bookmark) {
    const index = this.bookmarks.indexOf(bookmark);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.bookmarks);
      this.bookmarksService.saveBookmarks(this.bookmarks);
    }
  }

}
