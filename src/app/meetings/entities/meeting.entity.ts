import { GetMeetingsDto } from '../dto/get-meetings.dto';

export class MeetingEntity {
    Name: string;
    Date: Date;
    MeetingCategory: string;
    Country: string;
    City: string;

    constructor(data: GetMeetingsDto){
        this.Name = data.Name;
        this.MeetingCategory = data.MeetingCategory;
        this.Date = new Date(0);
        this.Date.setUTCSeconds(data.Date);
        this.City = data.City;
        this.Country = data.Country;
    }
}