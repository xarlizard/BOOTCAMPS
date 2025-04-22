//Ejercicio 1
let num1 = prompt("Dame un número");
let num2 = prompt("Y ahora otro");

let subtraction = num1 - num2;

console.log("La resta de los números indicados es de: " + subtraction);

//Ejercicio 2
let name = prompt("¿Cómo te llamas?");
let city = prompt("¿Dónde vives?");
let hobby = prompt("¿Cuál es tu hobby?");

console.log(
  "Te llamas " + name + ", vives en " + city + ", y te gusta " + hobby
);

//Ejercicio 3
let radius = prompt(
  "Vamos a calcular el area de un círculo. ¿Puedes indicarme cuanto mide el radio? (En cm)"
);
const pi = parseFloat(Math.PI.toFixed(4));
let circleArea = pi * Math.pow(radius, 2);

console.log(`El área de un círculo con radio ${radius} es: ${circleArea}`);
