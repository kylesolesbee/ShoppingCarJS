let shoppingItems = [];
const itemPrices = {
    apple: 1.00,
    banana: 0.75,
    orange: 1.50,
};

const salesTaxRate = 0.06; // 6% sales tax rate

function updatePrice() {
    const itemName = document.getElementById("item").value;
    const priceElement = document.getElementById("displayPrice");

    if (itemName && itemPrices.hasOwnProperty(itemName)) {
        const itemPrice = itemPrices[itemName];
        priceElement.textContent = `$${itemPrice.toFixed(2)}`;
    } else {
        priceElement.textContent = "";
    }
}

function addItem() {
    console.log("Adding item...");

    const itemName = document.getElementById("item").value;
    const priceElement = document.getElementById("displayPrice");

    if (itemName && itemPrices.hasOwnProperty(itemName)) {
        const itemPrice = itemPrices[itemName];

        shoppingItems.push({ name: itemName, price: itemPrice });

        updateTotal();
    } else {
        alert("Please select a valid item.");
        return;
    }

    document.getElementById("item").value = "";
    priceElement.textContent = "";

    displayShoppingList();
}

function updateTotal() {
    let subtotal = 0;
    shoppingItems.forEach(item => {
        subtotal += item.price;
    });

    const salesTax = subtotal * salesTaxRate;
    const grandTotal = subtotal + salesTax;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("salesTax").textContent = salesTax.toFixed(2);
    document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}

function displayShoppingList() {
    let shoppingListContainer = document.getElementById("shoppingList");
    shoppingListContainer.innerHTML = "";

    shoppingItems.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name}: $${item.price.toFixed(2)}`;
        shoppingListContainer.appendChild(listItem);
    });
}

function checkOut() {
    let checkoutMessage = "Items Purchased:\n";
    shoppingItems.forEach(item => {
        checkoutMessage += `${item.name}: $${item.price.toFixed(2)}\n`;
    });
    checkoutMessage += `\nSubtotal: $${document.getElementById("subtotal").textContent}\n`;
    checkoutMessage += `Sales Tax: $${document.getElementById("salesTax").textContent}\n`;
    checkoutMessage += `Grand Total: $${document.getElementById("grandTotal").textContent}`;

    alert(checkoutMessage);

    shoppingItems.length = 0;
    displayShoppingList();
    updateTotal();
}