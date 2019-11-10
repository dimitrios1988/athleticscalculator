import { IPointsDeductionStrategy } from '../interfaces/points-deduction-strategy.interface';
import { isNullOrUndefined } from 'util';

export class PointsDeductor {
    public static getDeductedPoints(pointsDeductionStrategy: IPointsDeductionStrategy, competitionDate: Date, targetDate: Date): string {
        let points = 0;
        const diff = this.monthDiff(competitionDate, targetDate);
        if (pointsDeductionStrategy.Max < diff) {
            return 'MAX';
        } else {
            if (!isNullOrUndefined(pointsDeductionStrategy.MonthPoints)) {
                if (!isNullOrUndefined(pointsDeductionStrategy.MonthPoints[diff])) {
                    return pointsDeductionStrategy.MonthPoints[diff].toString();
                }
            }

        }
        return points.toString();
    }

    private static monthDiff(d1: Date, d2: Date) {
        let months: number;
        months = (d2.getFullYear() - (d1.getFullYear())) * 12;
        months += (d2.getMonth() - d1.getMonth());
        if (d2.getDate() >= d1.getDate()) {
            months += 1;
        }
        return months <= 0 ? 0 : months;
    }
}