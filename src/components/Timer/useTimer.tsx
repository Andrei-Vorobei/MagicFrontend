import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TimersType } from "./Timer";

type TimerReturn = [
    days: number | string,
    hours: number | string,
    minutes: number | string,
    seconds: number | string,
];

type TimerArg = {

}

type UseTimer<A, S, D> = (args: A, set: S, dN: number) => void;

export const useTimer: UseTimer<TimersType[], Dispatch<SetStateAction<TimersType[]>>, TimerReturn> = 
( timersList ) => {

  // console.log('moment(nextDate): ', moment(nextDate).format('DD MMMM YYYY HH:mm:ss'));
  // console.log('moment(dateNow): ', moment(dateNow).format('DD MMMM YYYY HH:mm:ss'));
  // console.log('delta: ', delta);

  

  const format = (num: number): number | string => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  // return [
  //   format(days),
  //   format(hours),
  //   format(minutes),
  //   format(seconds),
  // ];
};