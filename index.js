import { menuArray } from "./data.js";

const mainEl = document.getElementById("main");

const billItems = document.getElementById("bill-items");
const billEl = document.getElementById("bill");
const finalDisplayBill = document.querySelector(".final-display-bill");
const nameInputEl = document.getElementById("name");
const cardNumberInputEl = document.getElementById("card-number");
const cvvInputEl = document.getElementById("cvv");
const formEl = document.getElementById("form");
const orderBtnEl = document.getElementById("order-btn");
const orderDisplayEl = document.getElementById("order-display");

let itemArr = menuArray.map(() => 2);

function render() {
  return menuArray
    .map(function (item) {
      const { name, ingredients, id, price, emoji } = item;

      return `<section class="item-section">
                <p class="item-emoji">${emoji}</p>
                <div class="item-details">
                    <p class="item-name">${name}</p>
                    <p class="item-description">${ingredients}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <div class="add-on-border" data-index="${id}">
               +
                </div>
            </section>`;
    })
    .join("");
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.index) {
    handleAddItemBtn(e.target.dataset.index);
  } else if (e.target.dataset.remove) {
    handleRemove(e.target.dataset.remove);
  } else if (e.target.id === "pay-btn") {
    e.preventDefault();
    payBtn();
  } else if (e.target.id === "order-btn") {
    orderBtn();
  }
});

function payBtn() {
  finalMsgDisplay(nameInputEl.value);
  nameInputEl.value = "";
  cardNumberInputEl.value = "";
  cvvInputEl.value = "";
  orderBtnEl.disabled = false;
  orderBtnEl.style.cursor = "pointer";
  formEl.classList.add("hidden");
  billEl.classList.add("hidden");
}

function orderBtn() {
  formEl.classList.remove("hidden");
  orderBtnEl.disabled = true;
  orderBtnEl.style.cursor = "not-allowed";
}

function handleAddItemBtn(itemId) {
  billEl.classList.remove("hidden");

  renderFooter(itemId);
}

function getObject(itemId) {
  return menuArray.filter(function (item) {
    return item.id === Number(itemId);
  })[0];
}

function finalMsgDisplay(name) {
  orderDisplayEl.classList.remove("hidden");
  orderDisplayEl.innerHTML = `<p>Thanks ${name}! your order is on the way</p>`;

  setTimeout(() => {
    orderDisplayEl.innerHTML = "";
    orderDisplayEl.classList.add("hidden");
  }, 3000);

  resetItemList();
}

function resetItemList() {
  const allBill = document.querySelector(".bill-items");
  allBill.innerHTML = "";
}

function renderFooter(itemId) {
  const obj = getObject(itemId);
  let renderFoot = "";

  const { name, ingredients, id, price, emoji } = obj;

  if (document.querySelector(`.bill-item[data-index="${id}"]`)) {
    const oldPara = document.querySelector(`.bill-item[data-index="${id}"]`);

    oldPara.innerHTML = ` <span class="bill-item-name">${name}</span><span      class="bill-item-remove" data-remove='${id}'>remove</span><span class="bill-total cal-bill">$${
      price * itemArr[id]
    }</span>
                    `;
    itemArr[id] = ++itemArr[id];
  } else {
    renderFoot = ` 
        <p class="bill-item" data-index='${id}'> 
         <span class="bill-item-name">${name}</span>
         <span class="bill-item-remove" data-remove='${id}'>remove</span>
         <span class="bill-total cal-bill">$${price}</span>
      </p>`;
    billItems.innerHTML += renderFoot;
  }

  totalBillDisplay();
}

function totalBillDisplay() {
  const allBill = document.querySelectorAll(".cal-bill");

  if (allBill.length > 0) {
    let totalPrice = 0;
    for (const bill of allBill) {
      totalPrice += Number(bill.textContent.replace("$", ""));
      finalDisplayBill.textContent = "$" + totalPrice;
    }
  } else {
    billEl.classList.add("hidden");
  }
}

function handleRemove(itemId) {
  document
    .querySelector(`.bill-item-remove[data-remove='${itemId}']`)
    .parentElement.remove();
  totalBillDisplay();
}

mainEl.innerHTML = render();
