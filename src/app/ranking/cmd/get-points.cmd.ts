export class GetPointsCmd {
    eventId: number;
    wind?: {
      wasMeasured: boolean;
      value?: number;
    };
    meetingCategory?: string;
    place?: number;
    performance: string;
    groupId?: number;
    progressToFinal?: boolean;
}