/* ===============================
   BASIC ANALYTICS (LOCAL)
=============================== */
function trackEvent(eventName, data = {}) {
    const events = JSON.parse(localStorage.getItem("analytics")) || [];
    events.push({
        event: eventName,
        data,
        time: new Date().toISOString()
    });
    localStorage.setItem("analytics", JSON.stringify(events));
}

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();

/* OPEN / CLOSED STATUS */
const hour = new Date().getHours();
const openStatus = document.getElementById("openStatus");
openStatus.textContent =
    hour >= 11 && hour < 20 ? "🟢 Open Now (11am – 8pm)" : "🔴 Closed (11am – 8pm)";

/* DAILY SPECIAL */
const specials = [
    "🔥 Today’s Special: Bacon Cheeseburger",
    "🌮 Today’s Special: Street Taco Combo",
    "🍟 Today’s Special: Loaded Fries"
];
document.getElementById("dailySpecial").textContent =
    specials[new Date().getDay() % specials.length];

/* HERO SLIDESHOW */
const slides = document.querySelectorAll(".hero-slide");
let slideIndex = 0;

setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}, 3500);

/* MENU DATA */
const menuData = [
    {
        category: "Classic Burgers",
        items: [
            {
                name: "Single Burger",
                price: "$9",
                images: ["images/single burger.png"],
                popular: true
            },
            {
                name: "Double Burger",
                price: "$12",
                images: ["images/double burger.png"]
            },
            {
                name: "Bacon Cheeseburger",
                price: "$13",
                images: ["images/beacon chesse burger.png"],
                popular: true
            },
            {
                name: "Burger with Fries",
                price: "$14",
                images: ["images/classic burger with fries.png"]
            }
        ]
    },
    {
        category: "Street Tacos",
        items: [
            {
                name: "Classic Taco",
                price: "$4",
                images: ["images/classic taco.png"]
            },
            {
                name: "Family Taco Pack",
                price: "$18",
                images: ["images/family taco.png"]
            },
            {
                name: "Party Size Tacos",
                price: "$25",
                images: ["images/party size taco.png"]
            }
        ]
    },
    {
        category: "Loaded Fries",
        items: [
            {
                name: "Fries with Ketchup",
                price: "$5",
                images: ["images/fries with ketcup.png"]
            },
            {
                name: "Large Fries",
                price: "$6",
                images: ["images/large fries.png"]
            },
            {
                name: "Loaded Fries",
                price: "$8",
                images: ["images/loaded fries.png"],
                popular: true
            }
        ]
    }
];

/* RENDER MENU */
const accordion = document.getElementById("menuAccordion");

menuData.forEach(section => {
    const categoryEl = document.createElement("div");
    categoryEl.className = "menu-category";

    categoryEl.innerHTML = `
    <div class="menu-header">${section.category}</div>
    <div class="menu-items"></div>
  `;

    const itemsEl = categoryEl.querySelector(".menu-items");

    section.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-item";

        card.innerHTML = `
      ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
      <img src="${item.images[0]}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>${item.price}</p>
      <button class="btn primary">Order</button>
    `;

        /* IMAGE CLICK (ANALYTICS + GALLERY) */
        card.querySelector("img").onclick = () => {
            trackEvent("menu_item_viewed", { item: item.name });
            openGallery(item.images);
        };

        /* ORDER CLICK */
        card.querySelector("button").onclick = () => {
            trackEvent("order_started", { item: item.name });
            openOrderModal(item.name);
        };

        itemsEl.appendChild(card);
    });

    categoryEl.querySelector(".menu-header").onclick = () => {
        const isOpen = itemsEl.classList.toggle("active");

        if (window.innerWidth <= 768) {
            document.body.classList.toggle("menu-open", isOpen);
        }

        trackEvent("menu_category_opened", { category: section.category });
    };


    accordion.appendChild(categoryEl);
});

/* ORDER MODAL */
const orderModal = document.getElementById("orderModal");
const modalItemName = document.getElementById("modalItemName");
const orderForm = document.getElementById("orderForm");

function openOrderModal(item) {
    modalItemName.textContent = `Order: ${item}`;
    orderModal.classList.remove("hidden");
}

function closeModal() {
    orderModal.classList.add("hidden");
}

/* ORDER SUBMIT */
orderForm.addEventListener("submit", e => {
    e.preventDefault();
    trackEvent("order_submitted", { item: modalItemName.textContent });
    alert("Demo order submitted!");
    closeModal();
});

/* IMAGE GALLERY */
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");

function openGallery(images) {
    galleryImage.src = images[0];
    galleryModal.classList.remove("hidden");
}

function closeGallery() {
    galleryModal.classList.add("hidden");
}

function showAnalytics() {
    const data = JSON.parse(localStorage.getItem("analytics")) || [];
    document.getElementById("analyticsOutput").textContent =
        JSON.stringify(data, null, 2);
}

function clearAnalytics() {
    localStorage.removeItem("analytics");
    showAnalytics();
}

/* SECRET KEY COMBO: CTRL + SHIFT + A */
document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
        const panel = document.getElementById("analyticsPanel");
        panel.classList.toggle("hidden");
        showAnalytics();
    }
});
