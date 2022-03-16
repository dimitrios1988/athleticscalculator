export class EventEntity {
  public Id: number;
  public Name: string;
  public Type: string;
  public Gender: string;
  public Order: number;
  public Groups: {
    Id: number;
    Name: string;
    IsExtra: boolean;
    HasProgressToFinal: boolean;
  }[];
  public PerformanceValidation: { Pattern: string; Message: string };
  public SupportsWind: boolean;
  public Icon: string;
  public PointsDeductionStrategy: { MonthPoints: {}; Max: number };
  SupportedPoints: {
    PerformancePoints: boolean;
    RankingPoints: boolean;
  };

  constructor(data: {
    Id: number;
    Name: string;
    Type: string;
    Gender: string;
    Order: number;
    Groups: {
      Id: number;
      Name: string;
      IsExtra: boolean;
      HasProgressToFinal: boolean;
    }[];
    PerformanceValidation: { Pattern: string; Message: string };
    SupportsWind: boolean;
    Icon: string;
    PointsDeductionStrategy: { MonthPoints: {}; Max: number };
    SupportedPoints: {
      PerformancePoints: boolean;
      RankingPoints: boolean;
    };
  }) {}
}
