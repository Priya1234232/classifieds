const defaultProducts = [
    {
        id: 1,
        name: "Samsung Phone",
        price: 12000,
        condition: "Good condition",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "HP Laptop",
        price: 30000,
        condition: "Used for 1 year",
        category: "laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Mountain Bicycle",
        price: 8000,
        condition: "Good condition",
        category: "vehicle",
        image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Wooden Table",
        price: 5000,
        condition: "Lightly used",
        category: "furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80"
    }
];

let products = JSON.parse(localStorage.getItem("classifiedProducts")) || defaultProducts;
let selectedProduct = null;

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const productForm = document.getElementById("productForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const closeToast = document.getElementById("closeToast");
const exploreBtn = document.getElementById("exploreBtn");

const orderModal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");
const orderForm = document.getElementById("orderForm");
const selectedProductBox = document.getElementById("selectedProduct");

const orderSuccess = document.getElementById("orderSuccess");
const orderDetails = document.getElementById("orderDetails");
const continueShopping = document.getElementById("continueShopping");

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
}

function saveProducts() {
    localStorage.setItem(
        "classifiedProducts",
        JSON.stringify(products)
    );
}

function saveOrders(orders) {
    localStorage.setItem(
        "classifiedOrders",
        JSON.stringify(orders)
    );
}

function getFilteredProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    return products.filter(product => {
        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.condition.toLowerCase().includes(search);

        const categoryMatch =
            category === "all" ||
            product.category === category;

        return searchMatch && categoryMatch;
    });
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
        emptyState.classList.add("show");
        return;
    }

    emptyState.classList.remove("show");

    filteredProducts.forEach(product => {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="condition">
                    ${product.condition}
                </p>

                <div class="price">
                    ₹${formatPrice(product.price)}
                </div>

                <button class="buy-btn" data-id="${product.id}">
                    🛒 Buy Now
                </button>
            </div>
        `;

        productGrid.appendChild(card);
    });

    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);

            selectedProduct = products.find(
                product => product.id === id
            );

            if (selectedProduct) {
                openOrderForm();
            }
        });
    });
}

function openOrderForm() {
    selectedProductBox.innerHTML = `
        <div>${selectedProduct.name}</div>
        <strong>₹${formatPrice(selectedProduct.price)}</strong>
        <div>${selectedProduct.condition}</div>
    `;

    orderModal.classList.add("show");

    document.getElementById("customerName").focus();
}

function closeOrderForm() {
    orderModal.classList.remove("show");
    orderForm.reset();
    selectedProduct = null;
}

function showToast(message) {
    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

productForm.addEventListener("submit", event => {
    event.preventDefault();

    const name =
        document.getElementById("productName").value.trim();

    const price =
        Number(document.getElementById("productPrice").value);

    const condition =
        document.getElementById("productCondition").value.trim();

    const image =
        document.getElementById("productImage").value.trim();

    if (!name || !price || price <= 0 || !condition) {
        showToast("Please enter valid product details.");
        return;
    }

    const productName = name.toLowerCase();

    let category = "other";

    if (
        productName.includes("phone") ||
        productName.includes("mobile") ||
        productName.includes("tablet") ||
        productName.includes("camera") ||
        productName.includes("tv")
    ) {
        category = "electronics";
    } else if (
        productName.includes("laptop") ||
        productName.includes("computer") ||
        productName.includes("macbook")
    ) {
        category = "laptop";
    } else if (
        productName.includes("bike") ||
        productName.includes("bicycle") ||
        productName.includes("cycle") ||
        productName.includes("scooter") ||
        productName.includes("car")
    ) {
        category = "vehicle";
    } else if (
        productName.includes("table") ||
        productName.includes("chair") ||
        productName.includes("sofa") ||
        productName.includes("bed") ||
        productName.includes("desk")
    ) {
        category = "furniture";
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        condition: condition,
        category: category,
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    };

    products.unshift(newProduct);

    saveProducts();

    productForm.reset();

    renderProducts();

    showToast("Product added for sale successfully!");

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!selectedProduct) {
        return;
    }

    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const customerAddress =
        document.getElementById("customerAddress").value.trim();

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    if (
        !customerName ||
        !customerPhone ||
        !customerAddress ||
        !paymentMethod
    ) {
        return;
    }

    const order = {
        orderId: "ORD" + Date.now(),
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        customerName: customerName,
        phone: customerPhone,
        address: customerAddress,
        paymentMethod: paymentMethod,
        orderDate: new Date().toLocaleString("en-IN"),
        status: "Order Placed"
    };

    const orders =
        JSON.parse(localStorage.getItem("classifiedOrders")) || [];

    orders.push(order);

    saveOrders(orders);

    orderModal.classList.remove("show");

    orderDetails.innerHTML = `
        <strong>Order ID:</strong> ${order.orderId}<br><br>
        <strong>Product:</strong> ${order.productName}<br>
        <strong>Amount:</strong> ₹${formatPrice(order.price)}<br>
        <strong>Payment:</strong> ${order.paymentMethod}<br><br>
        Your order has been successfully placed.
    `;

    orderSuccess.classList.add("show");

    orderForm.reset();

    selectedProduct = null;
});

closeOrder.addEventListener("click", closeOrderForm);

orderModal.addEventListener("click", event => {
    if (event.target === orderModal) {
        closeOrderForm();
    }
});

continueShopping.addEventListener("click", () => {
    orderSuccess.classList.remove("show");

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

searchBtn.addEventListener("click", renderProducts);

searchInput.addEventListener("input", renderProducts);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        renderProducts();
    }
});

categoryFilter.addEventListener("change", renderProducts);

exploreBtn.addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

closeToast.addEventListener("click", () => {
    toast.classList.remove("show");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll("nav a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

renderProducts();
