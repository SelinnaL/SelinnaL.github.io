(function () {
    const root = document.documentElement;
    const btn = document.getElementById("toggleTheme");

    // Check for saved theme or system preference
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
        root.setAttribute("data-theme", saved);
    } else {
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    // Toggle theme on click
    if (btn) {
        btn.addEventListener("click", () => {
            const cur = root.getAttribute("data-theme");
            const next = cur === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }
})();

