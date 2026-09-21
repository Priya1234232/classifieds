// ==========================================
// GET HTML ELEMENTS
// ==========================================

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const categorySelect =
    document.getElementById("categorySelect");


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");

    notificationText.textContent = message;

    notification.style.display = "flex";

    clearTimeout(window.notificationTimer);

    window.notificationTimer =
        setTimeout(function () {

            notification.style.display = "none";

        }, 3000);
}


// ==========================================
// CLOSE NOTIFICATION
// ==========================================

function closeNotification() {

    document.getElementById("notification")
        .style.display = "none";
}


// ==========================================
// EXPLORE PRODUCTS
// ==========================================

function exploreProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ==========================================
// BUY NOW
// ==========================================

function buyProduct(productName) {

    /*
        Instead of only showing a message,
        open checkout page/popup.
    */

    const modal =
        document.getElementById("checkoutModal");

    const productText =
        document.getElementById("checkoutProduct");


    productText.textContent =
        "Product: " + productName;


    /*
        Store selected product
        so Place Order knows which
        product was purchased.
    */

    modal.dataset.product =
        productName;


    modal.style.display = "flex";
}


// ==========================================
// CLOSE CHECKOUT
// ==========================================

function closeCheckout() {

    const modal =
        document.getElementById("checkoutModal");

    modal.style.display = "none";
}


// ==========================================
// CONNECT BUY BUTTONS
// ==========================================

function connectBuyButtons() {

    const buttons =
        document.querySelectorAll(".buy-btn");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".product-card");


                if (!card) {
                    return;
                }


                const productName =
                    card.dataset.name;


                buyProduct(productName);

            }
        );

    });
}


// ==========================================
// PLACE ORDER
// ==========================================

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const modal =
                document.getElementById(
                    "checkoutModal"
                );


            const productName =
                modal.dataset.product;


            const customerName =
                document.getElementById(
                    "billingName"
                ).value.trim();


            const email =
                document.getElementById(
                    "billingEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "billingPhone"
                ).value.trim();


            const address =
                document.getElementById(
                    "shippingAddress"
                ).value.trim();


            const city =
                document.getElementById(
                    "shippingCity"
                ).value.trim();


            const state =
                document.getElementById(
                    "shippingState"
                ).value.trim();


            const pincode =
                document.getElementById(
                    "shippingPincode"
                ).value.trim();


            const payment =
                document.getElementById(
                    "paymentMethod"
                ).value;


            // ==================================
            // VALIDATION
            // ==================================

            if (
                customerName === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                city === "" ||
                state === "" ||
                pincode === "" ||
                payment === ""
            ) {

                showNotification(
                    "Please fill all details!"
                );

                return;
            }


            // ==================================
            // CLOSE CHECKOUT
            // ==================================

            modal.style.display = "none";


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            showNotification(
                "Order placed successfully!"
            );


            // ==================================
            // CONSOLE ORDER DETAILS
            // ==================================

            console.log("========== ORDER ==========");

            console.log(
                "Product:",
                productName
            );

            console.log(
                "Customer:",
                customerName
            );

            console.log(
                "Email:",
                email
            );

            console.log(
                "Phone:",
                phone
            );

            console.log(
                "Address:",
                address
            );

            console.log(
                "City:",
                city
            );

            console.log(
                "State:",
                state
            );

            console.log(
                "Pincode:",
                pincode
            );

            console.log(
                "Payment:",
                payment
            );

            console.log(
                "=========================="
            );


            // ==================================
            // CLEAR FORM
            // ==================================

            document
                .getElementById("checkoutForm")
                .reset();


            // ==================================
            // SHOW ORDER CONFIRMATION
            // ==================================

            setTimeout(function () {

                showNotification(
                    "Thank you " +
                    customerName +
                    "! Your " +
                    productName +
                    " will be shipped soon."
                );

            }, 1500);

        }
    );


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    filterProducts(searchValue);
}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    filterProducts(searchValue);
}


// ==========================================
// FILTER PRODUCTS
// ==========================================

function filterProducts(searchValue) {

    const selectedCategory =
        categorySelect.value;

    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(function (card) {

        const productName =
            card.dataset.name
                .toLowerCase();


        const productCategory =
            card.dataset.category;


        const matchesSearch =
            productName.includes(
                searchValue
            );


        const matchesCategory =
            selectedCategory === "all" ||
            productCategory ===
                selectedCategory ||
            productCategory === "all";


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.classList.remove(
                "hidden"
            );

        } else {

            card.classList.add(
                "hidden"
            );

        }

    });
}


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct() {

    const name =
        document.getElementById(
            "productName"
        ).value.trim();


    const price =
        document.getElementById(
            "productPrice"
        ).value.trim();


    const condition =
        document.getElementById(
            "productCondition"
        ).value.trim();


    const image =
        document.getElementById(
            "productImage"
        ).value.trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (
        name === "" ||
        price === "" ||
        condition === ""
    ) {

        showNotification(
            "Please fill all required fields!"
        );

        return;
    }


    if (Number(price) <= 0) {

        showNotification(
            "Please enter a valid price!"
        );

        return;
    }


    // ======================================
    // DEFAULT IMAGE
    // ======================================

    let imageURL = image;


    if (imageURL === "") {

        imageURL =
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80";
    }


    // ======================================
    // PRODUCT CARD
    // ======================================

    const productCard =
        document.createElement("div");


    productCard.className =
        "product-card";


    productCard.dataset.category =
        "all";


    productCard.dataset.name =
        name;


    // ======================================
    // IMAGE
    // ======================================

    const productImage =
        document.createElement("img");


    productImage.src =
        imageURL;


    productImage.alt =
        name;


    // ======================================
    // PRODUCT INFO
    // ======================================

    const productInfo =
        document.createElement("div");


    productInfo.className =
        "product-info";


    // ======================================
    // NAME
    // ======================================

    const productTitle =
        document.createElement("h3");


    productTitle.textContent =
        name;


    // ======================================
    // CONDITION
    // ======================================

    const productCondition =
        document.createElement("p");


    productCondition.textContent =
        condition;


    // ======================================
    // PRICE
    // ======================================

    const productPrice =
        document.createElement("strong");


    productPrice.textContent =
        "₹" +
        Number(price)
            .toLocaleString("en-IN");


    // ======================================
    // BUY BUTTON
    // ======================================

    const buyButton =
        document.createElement("button");


    buyButton.type = "button";


    buyButton.className =
        "buy-btn";


    buyButton.innerHTML =
        '<i class="fa-solid fa-cart-shopping"></i> Buy Now';


    buyButton.addEventListener(
        "click",
        function () {

            buyProduct(name);

        }
    );


    // ======================================
    // ADD CONTENT
    // ======================================

    productInfo.appendChild(
        productTitle
    );

    productInfo.appendChild(
        productCondition
    );

    productInfo.appendChild(
        productPrice
    );

    productInfo.appendChild(
        buyButton
    );


    productCard.appendChild(
        productImage
    );

    productCard.appendChild(
        productInfo
    );


    productsGrid.appendChild(
        productCard
    );


    // ======================================
    // CLEAR FORM
    // ======================================

    document.getElementById(
        "productName"
    ).value = "";


    document.getElementById(
        "productPrice"
    ).value = "";


    document.getElementById(
        "productCondition"
    ).value = "";


    document.getElementById(
        "productImage"
    ).value = "";


    // ======================================
    // SUCCESS
    // ======================================

    showNotification(
        "Product added for sale successfully!"
    );


    productCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ==========================================
// SEARCH ENTER KEY
// ==========================================

searchInput.addEventListener(
    "keyup",
    function (event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


// ==========================================
// START
// ==========================================

connectBuyButtons();
