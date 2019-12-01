export interface IBookmarkData {
  formData: {
    performanceInput: string;
    windInput: string;
    windmeasuredSelect: string;
    windPoints: string;
    performancePoints: string;
    placeInput: string;
    competitionTypeSelect: string;
    meetingCategorySelect: string;
    calculatePlacePointsCheckbox: boolean;
    placePoints: string;
    progressedToFinalCombo: boolean;
    competitionDate: Date;
    targetDate: Date;
    datePoints: string;
  };
  isMain: boolean;
}
