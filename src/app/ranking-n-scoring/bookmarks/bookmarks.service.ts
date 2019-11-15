import { Injectable } from '@angular/core';
import { EventEntity } from '../ranking/entities/event.entity';
import { FormGroup } from '@angular/forms';
import { Bookmark } from './entities/bookmark.entity';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private bookmarks: Bookmark[];

  constructor() {
    this.bookmarks = this.getBookmarks();
    if (isNullOrUndefined(this.bookmarks)) {
      this.bookmarks = [];
    }
  }

  saveBookmark(name: string, event: EventEntity, eventForm: FormGroup, { totalPoints, totalPointsBeforeDeduction }): void {
    const bookmark = new Bookmark(
      {
        name,
        event,
        eventFormData: {
          performanceInput: eventForm.controls.performanceInput.value,
          windInput: eventForm.controls.windInput.value,
          windmeasuredSelect: eventForm.controls.windmeasuredSelect.value,
          windPoints: eventForm.controls.windPoints.value,
          performancePoints: eventForm.controls.performancePoints.value,
          placeInput: eventForm.controls.placeInput.value,
          competitionTypeSelect: eventForm.controls.competitionTypeSelect.value,
          meetingCategorySelect: eventForm.controls.meetingCategorySelect.value,
          calculatePlacePointsCheckbox: eventForm.controls.calculatePlacePointsCheckbox.value,
          placePoints: eventForm.controls.placePoints.value,
          progressedToFinalCombo: eventForm.controls.progressedToFinalCombo.value,
          competitionDate: eventForm.controls.competitionDate.value,
          targetDate: eventForm.controls.targetDate.value,
          datePoints: eventForm.controls.datePoints.value
        },
        points: { totalPoints: Number(totalPoints), totalPointsBeforeDeduction: Number(totalPointsBeforeDeduction) }
      });
    this.bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks, this.getCircularReplacer()));
  }

  saveBookmarks(bookmarks: Bookmark[]) {
    this.bookmarks = bookmarks;
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks, this.getCircularReplacer()));
  }

  getBookmarks(): Bookmark[] {
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    return this.bookmarks;
  }

  private getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }
}
