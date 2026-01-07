(function () {
    const root = document.documentElement;
    const btn = document.getElementById("toggleTheme");

    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
        root.setAttribute("data-theme", saved);
    } else {
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    btn?.addEventListener("click", () => {
        const cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = cur === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });
})();

(function () {
    const input = document.getElementById("siteSearch");
    const items = Array.from(document.querySelectorAll("article"));

    if (!input || items.length === 0) return;

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        for (const el of items) {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q) ? "" : "none";
        }
    });
})();