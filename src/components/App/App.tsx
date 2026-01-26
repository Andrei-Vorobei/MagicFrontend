import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as classes from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(state => ++state);
  };

  function isPalindrome(str: string) {
    // Приводим строку к нижнему регистру и убираем все символы, кроме букв и цифр
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    console.log('cleaned: ', cleaned);

    // Сравниваем строку с её обратным вариантом
    return cleaned === cleaned.split('').reverse().join('');
  }

  isPalindrome('A man, a plan, a canal: Panama');

  return (
    <div>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <Link to='/about'>about</Link>
      <br />
      <Link to='/shop'>shop</Link>
      <h1 className={classes.title}>{count}</h1>
      <button
        className={classes.button}
        onClick={increment}
      >
        inc
      </button>
      <Outlet />
    </div>
  );
}
