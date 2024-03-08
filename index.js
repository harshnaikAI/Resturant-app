"use-strict";

import { menuArray } from "./data.js";

const menuBtnEl = document.getElementById("menu-btn");

const orderMainDivEl = document.getElementById("order");

const mainEl = document.getElementById("main");

const modalEl = document.getElementById("modal");

const modalCloseBtn = document.getElementById("modal-close-btn");

const TotalPriceValue = document.getElementById("total-price-value");

const loginForm = document.getElementById("login-form");

const modalInputName = document.getElementById("modal-input-name");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  orderMainDivEl.classList.add("hidden");
  TotalPriceContainer.classList.add("hidden");
  finalMsg.classList.remove("hidden");
  displayMsgForDuration(
    ` Thanks, ${modalInputName.value}! Your order is on its way!`,
    5000
  );
  modalEl.style.display = "none";

  loginForm.reset();
  resetTheMenu();
});

function displayMsgForDuration(msg, duration) {
  finalMsg.textContent = msg;

  setTimeout(function () {
    finalMsgHide();
  }, duration);
}

function resetTheMenu() {
  let priceArray = [14, 12, 12];
  menuArray.forEach((ele, index) => {
    ele.price = priceArray[index];
  });

  const orderRows = document.getElementsByClassName("order-row");

  const orderRowsArray = Array.from(orderRows);

  orderRowsArray.forEach((row) => row.remove());

  console.log(menuArray);
}

const TotalPriceContainer = document.getElementById("total-price-container");

const CompleteOrderBtn = document.getElementById("complete-order-btn");

const modalBtn = document.getElementById("modal-btn");

const finalMsg = document.getElementById("final-msg");

const newMenu = menuArray
  .map(function (item) {
    return `<section class="section">
    <div class='emoji'>${item.emoji}</div>
  <div class="section-detail">
    <p class="section-detail-food-name">${item.name}</p>
    <p class="section-detail-food-ingredients">
      ${item.ingredients.join(", ")}
    </p>
    <p class="section-detail-food-price">$${item.price}</p>
  </div>
  <button class="menu-btn" id=${item.id}>+</button>
  </section>`;
  })
  .join("");

mainEl.innerHTML = newMenu;

function finalMsgHide() {
  finalMsg.classList.add("hidden");
}

document.addEventListener("click", function (e) {
  let obj = "";

  let incrementOfItem;
  console.log(typeof e.target.id);
  if (parseInt(e.target.id) === 0) {
    obj = getObject(e.target.id);

    if (obj[0].price === 0) {
      obj[0].price = 14;
    }

    incrementOfItem = 14;
    finalMsgHide();
  } else if (parseInt(e.target.id) === 1) {
    obj = getObject(e.target.id);

    if (obj[0].price === 0) {
      obj[0].price = 12;
    }

    incrementOfItem = 12;
    finalMsgHide();
  } else if (parseInt(e.target.id) === 2) {
    obj = getObject(e.target.id);

    if (obj[0].price === 0) {
      obj[0].price = 12;
    }

    incrementOfItem = 12;
    finalMsgHide();
  } else if (e.target.dataset.remove) {
    let removeObj = getObject(e.target.dataset.remove);

    incrementOfItem = removeObj[0].price;

    handleRemoveClick(removeObj[0], incrementOfItem);
  }

  if (obj) {
    renderObj(obj[0], incrementOfItem);
  }

  giveTotalPrice();

  if (e.target.id === "complete-order-btn") {
    console.log(e.target.id);
    openModal();
  }

  if (e.target.id === "modal-close-btn") {
    closeModal();
  }
});

function closeModal() {
  modalEl.style.display = "none";
}

function openModal() {
  modalEl.style.display = "inline";
}

function giveTotalPrice() {
  let total = 0;
  const totalPrice = [...document.getElementsByClassName("order-price")];

  console.log(totalPrice);

  totalPrice.forEach((element) => {
    const priceText = element.textContent;

    const numericValue = parseFloat(priceText.replace("$", ""));

    total += numericValue;
  });
  console.log(total);
  TotalPriceValue.textContent = "$" + total;

  if (total === 0) {
    orderMainDivEl.classList.add("hidden");
    TotalPriceContainer.classList.add("hidden");
  }
}

function handleRemoveClick(item, increment) {
  console.log(item.price);
  if (item.price !== 0) {
    console.log(item);

    console.log(increment);

    item.price -= increment;

    const specificPriceElements = document.querySelector(
      `[data-price="${item.id}"]`
    );

    specificPriceElements.textContent = "$" + item.price;

    specificPriceElements.parentElement.remove();
  }
}

function getObject(eleId) {
  return menuArray.filter(function (ele) {
    return ele.id === parseInt(eleId);
  });
}

function renderObj(item, increment) {
  const ola = document.getElementsByClassName(`${item.name}`);

  console.log(ola);

  const olaArray = Array.from(ola);

  console.log(olaArray);

  const includesItem = olaArray.some(
    (element) => element.textContent === item.name
  );

  console.log(includesItem);
  const paraOrderPriceEl = document.createElement("p");
  const orderDivInnerEl = document.createElement("div");
  const paraOrderNameEl = document.createElement("p");
  const paraOrderRemoveEl = document.createElement("p");

  const specificPriceElements = document.querySelector(
    `[data-price="${item.id}"]`
  );

  if (!includesItem) {
    orderMainDivEl.classList.remove("hidden");
    TotalPriceContainer.classList.remove("hidden");
    console.log(item);

    // single obj render

    orderDivInnerEl.classList.add("order-row");

    paraOrderNameEl.classList.add("order-name", item.name);

    paraOrderNameEl.setAttribute("data-name", item.id);

    paraOrderNameEl.textContent = `${item.name}`;

    paraOrderRemoveEl.classList.add("order-remove");
    paraOrderRemoveEl.setAttribute("data-remove", item.id);
    paraOrderRemoveEl.textContent = `remove`;

    paraOrderPriceEl.classList.add("order-price");
    paraOrderPriceEl.setAttribute("data-price", item.id);
    paraOrderPriceEl.textContent = `$${item.price}`;

    orderDivInnerEl.appendChild(paraOrderNameEl);
    orderDivInnerEl.appendChild(paraOrderRemoveEl);
    orderDivInnerEl.appendChild(paraOrderPriceEl);

    orderMainDivEl.appendChild(orderDivInnerEl);
  } else {
    // Update the price
    item.price += increment;

    console.log(item);

    console.log(specificPriceElements);

    specificPriceElements.textContent = "$" + item.price;
  }
}
