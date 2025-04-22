function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkCarStatus() {
  let hasGasoline =
    removeAccents(
      prompt("¿Tienes gasolina en el coche? (Escribe si o no)").toLowerCase()
    ) === "si";

  if (!hasGasoline) {
    let hasMoney =
      removeAccents(
        prompt(
          "¿Tienes dinero para poner gasolina? (Escribe si o no)"
        ).toLowerCase()
      ) === "si";

    if (hasMoney) {
      return "Pon gasolina en el coche.";
    } else {
      return "No tienes dinero, mejor ve en metro.";
    }
  } else {
    let hasBattery =
      removeAccents(
        prompt("¿El coche tiene batería? (Escribe si o no)").toLowerCase()
      ) === "si";

    if (!hasBattery) {
      return "Recarga la batería.";
    } else {
      return "Tienes gasolina y batería. Deberás ir al mecánico para revisar el coche.";
    }
  }
}

let result = checkCarStatus();
console.log(result);
