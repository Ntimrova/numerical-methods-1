import { log } from 'mathjs';  // Для обчислення логарифму

// Функція для рівняння ln(5x - 3) = 0.1x(1 + x)
const equation = (x) => log(5 * x - 3) - 0.1 * x * (1 + x);

// Метод дихотомії
export const bisectionMethod = (a, b, tol) => {
  let mid;
  while ((b - a) / 2 > tol) {
    mid = (a + b) / 2;
    if (equation(mid) === 0) return mid;
    else if (equation(a) * equation(mid) < 0) b = mid;
    else a = mid;
  }
  return mid;
};

// Метод Ньютона
export const newtonMethod = (x0, tol, maxIter = 1000) => {
  let x = x0;
  let iter = 0;
  const derivative = (x) => 5 / (5 * x - 3) - 0.1 * (1 + 2 * x);

  while (Math.abs(equation(x)) > tol && iter < maxIter) {
    x = x - equation(x) / derivative(x);
    iter++;
  }
  return x;
};

// Ітераційний метод
export const iterativeMethod = (x0, tol, maxIter = 1000) => {
  let x = x0;
  let iter = 0;

  const g = (x) => (log(5 * x - 3)) / (0.1 * (1 + x));

  while (Math.abs(g(x) - x) > tol && iter < maxIter) {
    x = g(x);
    iter++;
  }

  return x;
};
