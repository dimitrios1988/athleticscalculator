import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './entities/bookmark.entity';
import { MatTableDataSource } from '@angular/material';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  private bookmarks: Bookmark[];
  public dataSource: MatTableDataSource<Bookmark>;

  constructor(private bookmarksService: BookmarksService, mediaObserver: MediaObserver) {
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

  OnEdit(bookmark: Bookmark) {

  }

  getDisplayedColumns() {
    const columns = { 'lt-md': ['Name', 'TotalPoints', 'More'] };
    const allColumns = ['Icon', 'Name', 'Event', 'Performance', 'Date', 'TotalPoints', 'More'];


    return allColumns;
  }
}
