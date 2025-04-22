function getValidAge() {
  let age;
  while (true) {
    age = parseInt(prompt("¿Cuántos años tienes?"));
    if (!isNaN(age) && age > 0) {
      return age;
    }
    alert("Por favor, introduce una edad válida");
  }
}

function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function suitableForScholarship() {
  let age = getValidAge();

  if (age >= 18) {
    let city = prompt("¿En qué población vives?").toLowerCase();
    if (city === "barcelona") {
      return "Eres apto para la beca por ser mayor de 18 años y vivir en Barcelona.";
    }
  }

  if (age > 30) {
    let largeFamily =
      removeAccents(
        prompt(
          "¿Perteneces a una familia numerosa? (Escribe si o no)"
        ).toLowerCase()
      ) === "si";
    if (largeFamily) {
      return "Eres apto para la beca por ser mayor de 30 años y pertenecer a una familia numerosa.";
    }
  }

  if (age >= 12 && age <= 18) {
    let geniusDeveloper =
      removeAccents(
        prompt(
          "¿Eres un genio de la programación? (Escribe si o no)"
        ).toLowerCase()
      ) === "si";
    if (geniusDeveloper) {
      return "Eres apto para la beca por tener entre 12 y 18 años y ser un genio de la programación.";
    }
  }

  return "Lo sentimos, pero no eres apto para la beca.";
}

let result = suitableForScholarship();
console.log(result);
