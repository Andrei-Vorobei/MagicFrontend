import { useEffect, useMemo, useState } from "react";
import moment from "moment";

export const useInitTimer = () => {
  const [ dateNow, setDateNow ] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => setDateNow(Date.now()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const titleDate = useMemo(() => {
    const title = moment(dateNow);
    title.locale('ru');
    return title.format('DD MMMM YYYY HH:mm:ss');
  }, [dateNow]);

  const initTimer = useMemo(() => {
    const newYearNum = new Date().getFullYear();
    const neYearTimestamp = moment({
      year: newYearNum +1,
      month: 0,
      hours: 1,
      minutes: 1,
      seconds: 1,
    }).valueOf();

    return [{ date: neYearTimestamp, title: 'До Нового Года осталось', noDelete: true }];
  }, []);

  return {
    dateNow,
    titleDate,
    initTimer
  }
};