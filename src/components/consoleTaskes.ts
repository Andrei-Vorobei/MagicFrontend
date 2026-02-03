
// Среднее значение
export const averageVal = (arr: Array<number>): number => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

//Удаление дубликатов
export const removeDuplicates = (arr: any[]) => {
  const unique: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    !unique.includes(arr[i]) && unique.push(arr[i]);
  }

  return unique;
};

