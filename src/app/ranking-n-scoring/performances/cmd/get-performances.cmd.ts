export class GetPerformancesCmd {
  readonly Points: number;
  readonly Type: string;

  constructor(data: { Points: number; Type: string }) {
    this.Points = data.Points;
    this.Type = data.Type;
  }
}
