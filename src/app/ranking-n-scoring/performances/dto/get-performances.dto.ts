export class GetPerformancesDto {

    readonly EventName: string;
    readonly EventGender: string;
    readonly Performance: string;

    constructor(data: {EventName: string; EventGender: string; Performance: string;}) {
        this.EventName = data.EventName;
        this.EventGender = data.EventGender;
        this.Performance = data.Performance;
    }
}