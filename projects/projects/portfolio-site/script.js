const skills = [
    {
        category: "Web Development",
        items: [
            "HTML & semantic structure",
            "CSS & responsive design",
            "Basic JavaScript",
        ],
    },
    {
        category: "Technical Interests",
        items: [
            "Git & GitHub",
            "Linux basics",
            "Website deployment concepts",
            "SEO basics",
            "MySQL basics",
        ],
    },
    {
        category: "Trading (Learning)",
        items: [
            "Forex & XAU/USD basics",
            "Technical analysis basics",
            "Fundamental analysis basics",
            "Economic indicators",
            "Risk management principles",
            "Lot sizes & position sizing",
            "Stop-loss & take-profit",
            "Position sizing",
            "Trade journaling discipline",
        ],
    },
];

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";
    status.className = "form-status";

    const formData = new FormData(form);

    // Spam check (honeypot)
    if (formData.get("company")) {
        status.textContent = "Spam detected.";
        status.classList.add("error");
        return;
    }

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            form.reset();
            status.textContent = "Message sent successfully! I’ll get back to you soon.";
            status.classList.add("success");
        } else {
            status.textContent = "Something went wrong. Please try again.";
            status.classList.add("error");
        }
    } catch (error) {
        status.textContent = "Network error. Please try again later.";
        status.classList.add("error");
    }
});

// Render Projects
const projectGrid = document.getElementById("projectGrid");

projects.forEach(project => {
    projectGrid.innerHTML += `
    <div class="project-card" data-title="${project.title}" data-description="${project.description}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <span class="tag">${project.tag}</span>
    </div>
  `;
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");

document.addEventListener("click", e => {
    const card = e.target.closest(".project-card");
    if (!card) return;

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modal.classList.add("show");
});

document.querySelector(".modal-close").onclick = () => {
    modal.classList.remove("show");
};


// Render Skills
const skillsGrid = document.getElementById("skillsGrid");

skills.forEach(skill => {
    skillsGrid.innerHTML += `
    <div class="skill-card">
      <h3>${skill.category}</h3>
      <ul>
        ${skill.items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach(section => {
    observer.observe(section);
});
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
