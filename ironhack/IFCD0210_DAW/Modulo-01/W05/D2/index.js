// Iteration 1: Names and Input
let hacker1 = "Marta";
let hacker2 = "Chrome";

console.log("The driver's name is " + hacker1);
console.log("The navigator's name is " + hacker2);

// Iteration 2: Conditionals

if (hacker1.length > hacker2.length) {
  console.log(
    `The driver has the longest name, it has ${hacker1.length} characters.`
  );
} else if (hacker1.length < hacker2.length) {
  console.log(
    `It seems that the navigator has the longest name, it has ${hacker2.length} characters.`
  );
} else {
  console.log(
    `Wow, you both have equally long names, ${hacker1.length} characters!`
  );
}

// Iteration 3: Loops

// 3.1 Print the characters of the driver's name, separated by space, and in capital letters
let hacker1NameSpaced = hacker1.toUpperCase().split("").join(" ");
console.log(hacker1NameSpaced);

// 3.2 Print all the characters of the navigator's name in reverse order,

//Option 1
let hacker2Reversed = "";

for (let i = hacker2.length - 1; i >= 0; i--) {
  hacker2Reversed += hacker2[i];
}

console.log(hacker2Reversed);

//Option 2
let navigatorReversed = hacker2.split("").reverse().join("");
console.log(navigatorReversed);

// 3.3 Compare names in lexicographic order
if (hacker1.localeCompare(hacker2) < 0) {
  console.log("The driver's name goes first.");
} else if (hacker1.localeCompare(hacker2) > 0) {
  console.log("Yo, the navigator goes first, definitely.");
} else {
  console.log("What?! You both have the same name?");
}

// BONUS

// Bonus 1

// Generate 3 paragraphs
const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nibh, congue ut pulvinar sit amet, placerat eget odio. Nam quis mattis elit, ut facilisis nisl. Vestibulum nec accumsan turpis, porta lacinia nisl. Vivamus suscipit ex est, vel scelerisque eros facilisis nec. Proin finibus sit amet velit tempor pretium. Curabitur elementum vitae arcu quis ultrices. Suspendisse eleifend, nisi quis aliquet efficitur, est nulla fringilla quam, id suscipit quam enim ut urna. Etiam vulputate dignissim tempor. Nulla malesuada sem eu ipsum maximus, in tempor nisi congue.

Suspendisse ac tortor sed tellus congue vulputate. Praesent commodo, quam non facilisis mollis, nulla dolor sagittis mi, id tempor erat tellus quis felis. Mauris mollis enim tellus, vitae lobortis lacus consectetur id. Cras dapibus malesuada enim, non iaculis mi ullamcorper id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum mattis condimentum sem, et euismod ipsum. In ullamcorper, dolor quis bibendum sagittis, dui ex volutpat libero, ut fermentum quam enim quis magna. Donec lobortis urna ut ligula vulputate, id aliquam leo pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tortor velit, dictum vitae maximus eu, euismod in turpis. Nam id scelerisque libero. Quisque sed quam a leo pretium consectetur eget imperdiet justo. Donec lacinia magna eros, eu euismod enim feugiat ac. Integer faucibus metus interdum venenatis dignissim.

Curabitur ultrices rutrum leo, ac egestas est elementum a. Ut sit amet sodales magna, eu aliquet augue. Nunc pellentesque mauris id aliquam suscipit. Nulla aliquet et orci vel volutpat. Donec volutpat, augue varius sagittis laoreet, neque lacus interdum orci, quis consequat tortor velit sed dolor. Fusce fermentum nisl ac nisl laoreet, at ornare nulla dapibus. Mauris faucibus condimentum quam, id fringilla purus facilisis a. Nam ullamcorper massa ante, rhoncus efficitur nunc ultricies quis. Nullam pulvinar velit non ante rhoncus, ac tempor odio tristique. Morbi placerat massa felis, sed blandit metus facilisis fermentum. Maecenas commodo lorem tristique nisi facilisis, in aliquet lectus dignissim. Vestibulum ultricies est sed orci vehicula fringilla. Praesent quis justo tortor.`;

// Count the number of words in the string
console.log(longText.split(" ").length);

// Count the number of times the Latin word et appears
let etCount = 0;
let words = longText.split(" ");
for (let i = 0; i < words.length; i++) {
  if (words[i].toLowerCase() === "et") {
    etCount++;
  }
}

console.log(
  'El número de veces que aparece la palabra "et" es de ' + etCount + " veces"
);

// Bonus 2
let phraseToCheck = "Amor, Roma";

let cleanPhrase = phraseToCheck.replace(/[^a-zA-Z]/g, "").toLowerCase();
let reversed = "";

for (let i = cleanPhrase.length - 1; i >= 0; i--) {
  reversed += cleanPhrase[i];
}

console.log(
  cleanPhrase === reversed ? "Es un palíndromo" : "No es un palíndromo"
);
