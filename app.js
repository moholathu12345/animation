(function () {
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("menuBtn");
  const lastUpdated = document.getElementById("lastUpdated");

  const ids = ["introduction", "content", "learning-contract", "reflection", "downloads"];

  function setActive(id) {
    document.querySelectorAll(".nav-link").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.link === id);
    });
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Desktop + mobile link clicks
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = el.getAttribute("data-link");
      if (!id) return;

      // prevent brand anchor default jump
      if (el.tagName.toLowerCase() === "a") e.preventDefault();

      scrollToId(id);
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Scrollspy
  function onScroll() {
    const y = window.scrollY + 120;
    let current = ids[0];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    }
    setActive(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Last updated
  if (lastUpdated) {
    lastUpdated.textContent = new Date().toLocaleString();
  }
})();
