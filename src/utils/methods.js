// Utility function to evaluate the equation at a given x
const evaluateEquation = (equation, x) => {
    try {
      // Replace `x` in the equation with the actual value of x
      const parsedEquation = equation.replace(/x/g, `(${x})`);
      // Use eval to compute the result (ensure the equation is safe to evaluate)
      return eval(parsedEquation);
    } catch (error) {
      console.error('Error evaluating the equation:', error);
      return NaN;
    }
  };
  
  // Iterative method (fixed-point iteration)
  export const iterativeMethod = (equation, a, b, precision) => {
    let x0 = (a + b) / 2; // initial guess
    let x1 = evaluateEquation(equation, x0);
    let iterations = 0;
  
    while (Math.abs(x1 - x0) > precision && iterations < 1000) {
      x0 = x1;
      x1 = evaluateEquation(equation, x0);
      iterations++;
    }
  
    return { root: x1, iterations, accuracy: Math.abs(x1 - x0) };
  };
  
  // Bisection method (dichotomy method)
  export const bisectionMethod = (equation, a, b, precision) => {
    let iterations = 0;
    let mid = (a + b) / 2;
  
    while ((b - a) / 2 > precision && iterations < 1000) {
      let f_a = evaluateEquation(equation, a);
      let f_mid = evaluateEquation(equation, mid);
  
      if (f_mid === 0) {
        break; // Exact solution found
      }
  
      if (f_a * f_mid < 0) {
        b = mid; // Root lies between a and mid
      } else {
        a = mid; // Root lies between mid and b
      }
  
      mid = (a + b) / 2;
      iterations++;
    }
  
    return { root: mid, iterations, accuracy: (b - a) / 2 };
  };
  
  // Newton's method (tangent method)
  export const newtonMethod = (equation, a, b, precision) => {
    let x0 = (a + b) / 2; // initial guess
    let iterations = 0;
  
    const derivative = (equation, x) => {
      const h = 0.00001; // small step for numerical differentiation
      return (evaluateEquation(equation, x + h) - evaluateEquation(equation, x)) / h;
    };
  
    let f_x0 = evaluateEquation(equation, x0);
    let f_prime_x0 = derivative(equation, x0);
  
    while (Math.abs(f_x0) > precision && iterations < 1000) {
      if (f_prime_x0 === 0) {
        break; // Avoid division by zero
      }
  
      x0 = x0 - f_x0 / f_prime_x0;
      f_x0 = evaluateEquation(equation, x0);
      f_prime_x0 = derivative(equation, x0);
      iterations++;
    }
  
    return { root: x0, iterations, accuracy: Math.abs(f_x0) };
  };
  