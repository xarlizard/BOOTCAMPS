// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector(".price span");
  const quantity = product.querySelector(".quantity input");

  // Get the numeric values
  const priceValue = parseFloat(price.innerHTML);
  const quantityValue = parseInt(quantity.value);

  // Calculate subtotal
  const subtotal = priceValue * quantityValue;

  // Update subtotal in DOM
  const subtotalElement = product.querySelector(".subtotal span");
  subtotalElement.innerHTML = subtotal.toFixed(2);

  return subtotal;
}

function calculateAll() {
  let total = 0;
  const products = document.getElementsByClassName("product");

  // Calculate subtotal for each product
  for (let product of products) {
    total += updateSubtotal(product);
  }

  // Update total in DOM
  document.querySelector("#total-value span").innerHTML = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  const row = target.parentNode.parentNode;
  row.parentNode.removeChild(row);

  // Recalculate total
  calculateAll();
}

// ITERATION 5

function createProduct() {
  const nameInput = document.querySelector(
    ".create-product td:first-child input"
  );
  const priceInput = document.querySelector(
    ".create-product td:nth-child(2) input"
  );

  // Get values
  const name = nameInput.value;
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(price)) {
    alert("Please enter valid product name and price");
    return;
  }

  // Create new product row
  const tbody = document.querySelector("#cart tbody");
  const newRow = document.createElement("tr");
  newRow.className = "product";

  newRow.innerHTML = `
    <td class="name">
      <span>${name}</span>
    </td>
    <td class="price">$<span>${price.toFixed(2)}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  tbody.appendChild(newRow);

  // Add remove event listener to new button
  const removeButton = newRow.querySelector(".btn-remove");
  removeButton.addEventListener("click", removeProduct);

  // Clear inputs
  nameInput.value = "";
  priceInput.value = "0";
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  // Add event listeners to all remove buttons
  const removeButtons = document.getElementsByClassName("btn-remove");
  for (let button of removeButtons) {
    button.addEventListener("click", removeProduct);
  }

  // Add event listener to create button
  const createBtn = document.getElementById("create");
  createBtn.addEventListener("click", createProduct);
});
