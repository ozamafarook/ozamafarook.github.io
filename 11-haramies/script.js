/* =========================================================
   11 HARAMIES
   FOOTBALL JERSEY STORE
   MAIN JAVASCRIPT
   ========================================================= */


/* ================= WHATSAPP ================= */

const whatsappNumber = "94752334766";


/* ================= MAIN ELEMENTS ================= */

const menuButton = document.getElementById("menuButton");
const shopNav = document.getElementById("shopNav");

const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const addCartButtons = document.querySelectorAll(".add-cart");
const wishlistButtons = document.querySelectorAll(".wishlist-button");
const sizeOptions = document.querySelectorAll(".size-option");

const searchButton = document.getElementById("searchButton");


/* ================= CHECKOUT ELEMENTS ================= */

const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const customerName =
    document.getElementById("customerName");

const customerPhone =
    document.getElementById("customerPhone");

const customerCity =
    document.getElementById("customerCity");

const customerAddress =
    document.getElementById("customerAddress");

const customerNote =
    document.getElementById("customerNote");


/* ================= CART DATA ================= */

let cart = [];


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuButton && shopNav) {

    menuButton.addEventListener("click", function () {

        shopNav.classList.toggle("active");

        const icon = menuButton.querySelector("i");

        if (shopNav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const navLinks = shopNav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            shopNav.classList.remove("active");

            const icon = menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   SIZE SELECTION
   ========================================================= */

sizeOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;


        const productSizes =
            productCard.querySelectorAll(
                ".size-option"
            );


        productSizes.forEach(
            function (sizeButton) {

                sizeButton.classList.remove(
                    "selected"
                );

            }
        );


        button.classList.add("selected");


        const sizeArea =
            productCard.querySelector(
                ".size-area"
            );


        const sizeLabel =
            productCard.querySelector(
                ".size-label"
            );


        if (sizeArea) {

            sizeArea.classList.remove("error");

        }


        if (sizeLabel) {

            sizeLabel.textContent =
                "SELECT SIZE";

        }

    });

});


/* =========================================================
   CART OPEN
   ========================================================= */

function openCart() {

    if (!cartDrawer || !cartOverlay) return;


    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CART CLOSE
   ========================================================= */

function closeCartDrawer() {

    if (!cartDrawer || !cartOverlay) return;


    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");


    if (
        !checkoutModal ||
        !checkoutModal.classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartDrawer
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );

}


/* =========================================================
   ADD TO CART
   ========================================================= */

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;


        const selectedSizeButton =
            productCard.querySelector(
                ".size-option.selected"
            );


        const sizeArea =
            productCard.querySelector(
                ".size-area"
            );


        const sizeLabel =
            productCard.querySelector(
                ".size-label"
            );


        /* SIZE REQUIRED */

        if (!selectedSizeButton) {

            if (sizeArea) {

                sizeArea.classList.remove("error");

                void sizeArea.offsetWidth;

                sizeArea.classList.add("error");

            }


            if (sizeLabel) {

                sizeLabel.textContent =
                    "PLEASE SELECT A SIZE";

            }


            return;

        }


        const productName =
            button.dataset.name;


        const productPrice =
            Number(button.dataset.price);


        const selectedSize =
            selectedSizeButton.dataset.size;


        /* SAME JERSEY + SAME SIZE */

        const existingProduct =
            cart.find(function (item) {

                return (
                    item.name === productName &&
                    item.size === selectedSize
                );

            });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                size: selectedSize,

                quantity: 1

            });

        }


        updateCart();


        /* BUTTON SUCCESS EFFECT */

        const icon =
            button.querySelector("i");


        if (icon) {

            icon.classList.remove("fa-plus");

            icon.classList.add("fa-check");


            setTimeout(function () {

                icon.classList.remove(
                    "fa-check"
                );

                icon.classList.add(
                    "fa-plus"
                );

            }, 700);

        }


        openCart();

    });

});


/* =========================================================
   CALCULATE TOTAL
   ========================================================= */

function calculateCartTotal() {

    return cart.reduce(
        function (total, item) {

            return (
                total +
                item.price *
                item.quantity
            );

        },
        0
    );

}


/* =========================================================
   UPDATE CART
   ========================================================= */

function updateCart() {

    if (
        !cartItemsContainer ||
        !cartCount ||
        !cartTotal
    ) {

        return;

    }


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <p>
                    Your bag is empty.
                </p>

                <span>
                    Choose a jersey, select your size and start your order.
                </span>

            </div>

        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "LKR 0";


        if (checkoutTotal) {

            checkoutTotal.textContent =
                "LKR 0";

        }


        return;

    }


    cartItemsContainer.innerHTML = "";


    let totalQuantity = 0;


    cart.forEach(function (item, index) {

        totalQuantity += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <span class="cart-size">
                    Size: ${item.size}
                </span>

                <p>
                    LKR ${item.price.toLocaleString()}
                    ×
                    ${item.quantity}
                </p>

            </div>


            <button
                class="remove-item"
                type="button"
                data-index="${index}"
                aria-label="Remove item"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    const totalPrice =
        calculateCartTotal();


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        "LKR " +
        totalPrice.toLocaleString();


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "LKR " +
            totalPrice.toLocaleString();

    }


    /* REMOVE ITEM */

    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                if (!cart[index]) return;


                if (
                    cart[index].quantity > 1
                ) {

                    cart[index].quantity -= 1;

                } else {

                    cart.splice(index, 1);

                }


                updateCart();

            }
        );

    });

}


/* =========================================================
   WISHLIST
   ========================================================= */

wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon =
            button.querySelector("i");


        if (!icon) return;


        if (
            icon.classList.contains(
                "fa-regular"
            )
        ) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

            button.style.color =
                "#e8ff00";

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

            button.style.color = "";

        }

    });

});


/* =========================================================
   SEARCH
   ========================================================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        function () {

            const searchTerm =
                prompt(
                    "Search jerseys:"
                );


            if (!searchTerm) return;


            const products =
                document.querySelectorAll(
                    ".product-card"
                );


            let found = false;


            products.forEach(function (product) {

                const productName =
                    product.dataset.name
                        .toLowerCase();


                if (
                    productName.includes(
                        searchTerm.toLowerCase()
                    )
                ) {

                    if (!found) {

                        product.scrollIntoView({

                            behavior: "smooth",

                            block: "center"

                        });

                    }


                    product.style.borderColor =
                        "#e8ff00";


                    setTimeout(function () {

                        product.style.borderColor =
                            "";

                    }, 2000);


                    found = true;

                }

            });


            if (!found) {

                alert(
                    "No jersey found for: " +
                    searchTerm
                );

            }

        }
    );

}


/* =========================================================
   OPEN CHECKOUT
   ========================================================= */

function openCheckoutModal() {

    if (
        !checkoutModal ||
        !checkoutOverlay
    ) {

        return;

    }


    if (cart.length === 0) {

        alert(
            "Your shopping cart is empty."
        );

        return;

    }


    const total =
        calculateCartTotal();


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "LKR " +
            total.toLocaleString();

    }


    /* CLOSE CART */

    if (cartDrawer) {

        cartDrawer.classList.remove(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }


    /* OPEN CHECKOUT */

    checkoutOverlay.classList.add(
        "active"
    );


    checkoutModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(function () {

        if (customerName) {

            customerName.focus();

        }

    }, 300);

}


/* =========================================================
   CLOSE CHECKOUT
   ========================================================= */

function closeCheckoutModal() {

    if (
        checkoutModal &&
        checkoutOverlay
    ) {

        checkoutModal.classList.remove(
            "active"
        );


        checkoutOverlay.classList.remove(
            "active"
        );

    }


    document.body.style.overflow = "";

}


/* ================= CHECKOUT BUTTON ================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        openCheckoutModal
    );

}


if (closeCheckout) {

    closeCheckout.addEventListener(
        "click",
        closeCheckoutModal
    );

}


if (checkoutOverlay) {

    checkoutOverlay.addEventListener(
        "click",
        closeCheckoutModal
    );

}


/* =========================================================
   REMOVE INVALID STYLE WHILE TYPING
   ========================================================= */

const checkoutInputs = document.querySelectorAll(
    "#checkoutForm input, #checkoutForm textarea"
);


checkoutInputs.forEach(function (field) {

    field.addEventListener(
        "input",
        function () {

            field.classList.remove(
                "invalid"
            );

        }
    );

});


/* =========================================================
   VALIDATE CHECKOUT
   ========================================================= */

function validateCheckoutForm() {

    let valid = true;


    const requiredFields = [

        customerName,

        customerPhone,

        customerCity,

        customerAddress

    ];


    requiredFields.forEach(function (field) {

        if (
            !field ||
            field.value.trim() === ""
        ) {

            if (field) {

                field.classList.add(
                    "invalid"
                );

            }


            valid = false;

        }

    });


    /* BASIC PHONE CHECK */

    if (
        customerPhone &&
        customerPhone.value.trim().length < 7
    ) {

        customerPhone.classList.add(
            "invalid"
        );

        valid = false;

    }


    return valid;

}


/* =========================================================
   SEND COMPLETE ORDER TO WHATSAPP
   ========================================================= */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your shopping cart is empty."
                );

                closeCheckoutModal();

                return;

            }


            if (!validateCheckoutForm()) {

                const firstInvalid =
                    checkoutForm.querySelector(
                        ".invalid"
                    );


                if (firstInvalid) {

                    firstInvalid.focus();

                }


                return;

            }


            const name =
                customerName.value.trim();


            const phone =
                customerPhone.value.trim();


            const city =
                customerCity.value.trim();


            const address =
                customerAddress.value.trim();


            const note =
                customerNote
                    ? customerNote.value.trim()
                    : "";


            let orderMessage = "";


            /* HEADER */

            orderMessage +=
                "*11 HARAMIES ORDER*\n\n";


            /* CUSTOMER */

            orderMessage +=
                "*CUSTOMER DETAILS*\n";


            orderMessage +=
                "Name: " +
                name +
                "\n";


            orderMessage +=
                "Phone: " +
                phone +
                "\n";


            orderMessage +=
                "City: " +
                city +
                "\n";


            orderMessage +=
                "Address: " +
                address +
                "\n";


            if (note !== "") {

                orderMessage +=
                    "Order Note: " +
                    note +
                    "\n";

            }


            orderMessage += "\n";


            /* ORDER */

            orderMessage +=
                "*ORDER DETAILS*\n\n";


            cart.forEach(
                function (item, index) {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    orderMessage +=
                        "*" +
                        (index + 1) +
                        ". " +
                        item.name +
                        "*\n";


                    orderMessage +=
                        "Size: " +
                        item.size +
                        "\n";


                    orderMessage +=
                        "Quantity: " +
                        item.quantity +
                        "\n";


                    orderMessage +=
                        "Price: LKR " +
                        item.price.toLocaleString() +
                        "\n";


                    orderMessage +=
                        "Subtotal: LKR " +
                        itemTotal.toLocaleString() +
                        "\n\n";

                }
            );


            const total =
                calculateCartTotal();


            orderMessage +=
                "------------------------------\n";


            orderMessage +=
                "*TOTAL: LKR " +
                total.toLocaleString() +
                "*\n\n";


            orderMessage +=
                "Please confirm availability and delivery details.\n";


            orderMessage +=
                "Thank you!";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    orderMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {

            return;

        }


        /* CLOSE CHECKOUT FIRST */

        if (
            checkoutModal &&
            checkoutModal.classList.contains(
                "active"
            )
        ) {

            closeCheckoutModal();

            return;

        }


        /* CLOSE CART */

        closeCartDrawer();


        /* CLOSE MOBILE MENU */

        if (shopNav) {

            shopNav.classList.remove(
                "active"
            );

        }


        if (menuButton) {

            const icon =
                menuButton.querySelector(
                    "i"
                );


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900 &&
            shopNav
        ) {

            shopNav.classList.remove(
                "active"
            );


            if (menuButton) {

                const icon =
                    menuButton.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   INITIAL CART
   ========================================================= */

updateCart();