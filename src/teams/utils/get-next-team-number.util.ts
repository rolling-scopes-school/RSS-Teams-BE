import { ITeam } from '../models/team.interface';

export const getNextTeamNumber: (arr: ITeam[]) => number = (arr: ITeam[]): number => {
  let missedNumber: number;
  let lastNumber: number;

  const positiveNumbers: number[] = arr.map(item => item.number).sort();

  if (!positiveNumbers.length) {
    return 1;
  }

  positiveNumbers.some((element, index) => {
    if (element !== index + 1) {
      missedNumber = index + 1;
    }

    lastNumber = index + 1;

    return missedNumber;
  });

  return missedNumber ?? lastNumber + 1;
};
