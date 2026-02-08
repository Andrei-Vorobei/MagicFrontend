import { de } from "date-fns/locale";
import { resolve } from "node:dns";

// Среднее значение
export const averageVal = (arr: Array<number>): number => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

// const toConsole = taskes.averageVal([1, 2, 3, 4, 5])
// console.log('Среднее значение: ', toConsole);

//Удаление дубликатов
export const removeDuplicates = (arr: any[]) => {
  const unique: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    !unique.includes(arr[i]) && unique.push(arr[i]);
  }

  return unique;
};

//Метод массива аналог map
const myMap = function<I, R = I>(callback: (item: I, indx: number, arr: I[]) => R): any[R] {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback(this[i], i, this))
  }

  return newArr;
};

//@ts-ignore
Array.prototype.myMap = myMap;

// @ts-ignore
// console.log('MyMap: ',[1, 2, 3].myMap(i => {
//   console.log(i);
//   return i + 10;
// }));

//Метод масссива аналог reduce
const myReduce = function<I, R>(
  callback: (acc: R, item: I, indx: number, arr: I[]) => R,
  init?: R
): R {

  let acc: R = init;

  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

//@ts-ignore
Array.prototype.myReduce = myReduce;

//Метод массива группировка
const groupBy = function<I, R extends Record<any, I[]>>(
  callback: (item: I, indx: number, arr: I[])=> any
): R {
  let res: Record<any, I[]> = {};
  for (let i = 0; i < this.length; i++) {
    const key = callback(this[i], i, this);
    if (!res[key]) {
      res[key] = [this[i]];
    } else {
      res[key].push(this[i]);
    }
  }
  return res as R;
};

// @ts-ignore
Array.prototype.groupBy = groupBy;

const arr = [6.1, 4.2, 6.3, 6.6, 7.1];
//@ts-ignore
// console.log('groupBy: ', arr.groupBy(Math.floor));

const debounce = <A>(func: (...args: A[])=> any, delay: number) => {
  let timerIndex: string | number | NodeJS.Timeout;

  return function(...args: A[]) {
    clearTimeout(timerIndex);
    const context = this;
    timerIndex = setTimeout(() => {
      return func.apply(context, args);
    }, delay);
  };
};

// const consoleMsg = debounce<string>(console.log, 1000);

// consoleMsg('Первый');
// consoleMsg('Второй');
// consoleMsg('Третий');

const sleep = (delay: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

// sleep(3000).then(() => console.log('TEST'));

const promisify = (fn: (...args: any[])=> any) => {
  return (...args: any[]) => {
    return new Promise<void>((resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (err) {
        reject(err);
      }
    })
  };
};

// const consoleRes = (res: any) => {
//   throw(Error('ERROR'));
// };
// const consoleRes = (res: any) => res;
// const promiseRes = promisify(consoleRes);
// promiseRes('TEST').then(res => console.log('res: ', res)).catch(err => console.log('error: ', err));

type MyPromiseState = 'pending' | 'fulfilled' | 'rejected';

type Resolver<T> = (value: T | MyPromise<T>) => void;
type Rejecter = (reason: any) => void;
type ThenCallback<T, U> = (value: T) => U | MyPromise<U>;
type CatchCallback<U> = (reason: any) => U | MyPromise<U>;

class MyPromise<T> {
  private state: MyPromiseState  = 'pending';
  private value: T | undefined = undefined;
  private reason: any = undefined;
  private onFulfilledCallbacks: Resolver<T>[] = [];
  private onRejectedCallbacks: Rejecter[] = [];

  constructor(executor: (resolve: Resolver<T>, reject: Rejecter) => void) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err)
    }
  }

  private resolve(value: T) {
    if (this.state !== 'pending') return;

    if (value instanceof MyPromise) {
      value.then(
        (val) => this.resolve(val),
        (err) => this.reject(err)
      );
    }

    this.value = value;
    this.state = 'fulfilled';

    this.onFulfilledCallbacks.forEach(cb => cb(value));
    this.onFulfilledCallbacks = [];
  }

  private reject(reason: any): void {
    if (this.state !== 'pending') return;

    this.state = 'rejected';
    this.reason = reason;

    this.onRejectedCallbacks.forEach(cb => cb(reason));
    this.onRejectedCallbacks = [];
  }

  public then<U>(
    onFulfilled?: ThenCallback<T, U>,
    onRejected?: CatchCallback<U>
  ): MyPromise<U> {
    return new MyPromise<U>((resolve, reject) => {
      const handleFulfilled = (value: T) => {
        if (typeof onFulfilled === 'function') {
          try {
            const result = onFulfilled(value);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(value as unknown as U); // Пропускаем значение
        }
      };

      const handleRejected = (reason: any) => {
        if (typeof onRejected === 'function') {
          try {
            const result = onRejected(reason);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(reason); // Перебрасываем ошибку
        }
      };

      if (this.state === 'fulfilled') {
        handleFulfilled(this.value!);
      } else if (this.state === 'rejected') {
        handleRejected(this.reason);
      } else {
        // Ещё pending — сохраняем коллбэки
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  public catch<U>(onRejected: CatchCallback<U>): MyPromise<U> {
    return this.then(undefined, onRejected);
  }

  public finally(onFinally: () => void): MyPromise<T> {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (reason) => {
        onFinally();
        throw reason;
      }
    );
  }

  static resolve<T>(value: T | MyPromise<T>): MyPromise<T> {
    if (value instanceof MyPromise) return value;
    return new MyPromise<T>((resolve) => resolve(value));
  }

  static reject<T>(reason: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => reject(reason));
  }

  static all<T>(promises: Array<MyPromise<T>>): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const results: T[] = [];
      let completedCount = 0;

      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            results[index] = value;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }
}

//Кэширование
// const createCache = () => {
//   const cache: Record<string, any> = {};

//   return (fn: (...args: any[])=>any) => {
//     return (...args: any[]) => {
    //   const key = JSON.stringify(args);
    //   if (cache.hasOwnproperty(key)) {
    //     return cache[key];
    //   }
    //   const value = fn(...args);
    //   cache[key] = value;
    //   return value;
    // };
//   };
// };

const withCache = (fn: (...args: any[])=>any) => {
  const cache: Record<string, any> = {};

  return (...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.hasOwnproperty(key)) {
      return cache[key];
    }
    const value = fn(...args);
    cache[key] = value;
    return value;
  };
};

const deepClone = <T extends Record<any, any> | any[]>(object: T): T => {
  const checkIsObject = (obj: T) => {
    if (obj !== null && typeof obj === 'object') return true;
  };

  if (!checkIsObject(object)) return object;

  const clone = Array.isArray(object) ? [] : {};

  Object.entries(object).forEach(([key, value]) => {
    if (checkIsObject(value)) {
      //@ts-ignore
      clone[key] = deepClone(value);
    }
  });

  return clone as T;
};
