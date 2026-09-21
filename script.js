const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

function showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    notificationText.textContent = message;
    notification.style.display = "flex";

    setTimeout(function () {
        notification.style.display = "none";
    }, 3000);
}

function closeNotification() {
    document.getElementById("notification").style.display = "none";
}

function exploreProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function buyProduct(productName) {
    showNotification(productName + " added to your cart!");
}

function searchProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });

    if (searchValue === "") {
        cards.forEach(function (card) {
            card.classList.remove("hidden");
        });
    }
}

function filterCategory() {
    const category = categorySelect.value;
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function (card) {
        if (
            category === "all" ||
            card.dataset.category === category
        ) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const condition = document.getElementById("productCondition").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (name === "" || price === "" || condition === "") {
        showNotification("Please fill all required fields!");
        return;
    }

    let imageURL = image;

    if (imageURL === "") {
        imageURL = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80";
    }

    const productCard = document.createElement("div");

    productCard.className = "product-card";
    productCard.dataset.category = "all";
    productCard.dataset.name = name;

    productCard.innerHTML = `
        <img src="${imageURL}" alt="${name}">

        <div class="product-info">

            <h3>${escapeHTML(name)}</h3>

            <p>${escapeHTML(condition)}</p>

            <strong>₹${Number(price).toLocaleString("en-IN")}</strong>

            <button onclick="buyProduct('${escapeHTML(name)}')">
                <i class="fa-solid fa-cart-shopping"></i>
                Buy Now
            </button>

        </div>
    `;

    productsGrid.appendChild(productCard);

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCondition").value = "";
    document.getElementById("productImage").value = "";

    showNotification(
        "Product added for sale successfully!"
    );

    productCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchProducts();
    }
});
