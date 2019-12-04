export interface IBookmarkData {
  formData: {
    performanceInput: string;
    windInput: string;
    windmeasuredSelect: string;
    windPoints: string;
    performancePoints: string;
    placeInput: string;
    competitionTypeSelect: { Id: number; Name: string; HasProgressToFinal: boolean }[];
    meetingCategorySelect: string;
    calculatePlacePointsCheckbox: boolean;
    placePoints: string;
    progressedToFinalCombo: boolean;
    competitionDate: Date;
    targetDate: Date;
    datePoints: string;
    totalPoints: string;
    totalPointsBeforeDeduction: string;
  };
  isMain: boolean;
}
