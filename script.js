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

// ===== Image lightbox =====
(function () {
    const triggers = document.querySelectorAll(
        ".project-gallery img, .poster-link"
    );
    if (!triggers.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML =
        '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
        '<img class="lightbox-img" src="" alt=""/>';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    function open(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        closeBtn.focus();
    }

    function close() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        // Defer clearing src so the fade-out doesn't show a broken image.
        setTimeout(() => {
            lightboxImg.src = "";
        }, 200);
    }

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) close();
    });

    triggers.forEach((el) => {
        if (el.tagName === "IMG") {
            el.addEventListener("click", () => open(el.currentSrc || el.src, el.alt));
        } else {
            // <a class="poster-link">
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const img = el.querySelector("img");
                const href = el.getAttribute("href");
                open(href || (img && img.src), img && img.alt);
            });
        }
    });
})();

