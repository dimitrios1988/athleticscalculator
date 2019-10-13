export class MeetingFilterEntity {
    Month: number;
    Year: number;
    MeetingCategory: string;
    Country: string;
    SearchText: string;

    constructor(data: {Month: number, Year: number, MeetingCategory: string, Country: string, SearchText: string}) {
        if (!!data) {
            this.Month = data.Month;
            this.Year = data.Year;
            this.MeetingCategory = data.MeetingCategory;
            this.Country = data.Country;
            this.SearchText = data.SearchText;
        }
    }
}
