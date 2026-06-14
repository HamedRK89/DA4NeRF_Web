document.addEventListener("DOMContentLoaded", function () {

    // --------------------------------------------------------
    // Tab switching
    // --------------------------------------------------------
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.tab;
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".project-section").forEach(s => s.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(target).classList.add("active");
            window.dispatchEvent(new Event("resize"));
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // --------------------------------------------------------
    // Image comparison sliders (curtain reveal)
    // --------------------------------------------------------
    document.querySelectorAll(".comp-wrapper").forEach(wrapper => {
        const leftClip = wrapper.querySelector(".comp-left-clip");
        const leftImg  = wrapper.querySelector(".comp-left");
        const divider  = wrapper.querySelector(".comp-divider");
        const range    = wrapper.querySelector(".comp-range");

        // The inner image must always be the full pixel width of the wrapper
        // so background-size:cover scales identically on both sides.
        function syncWidth() {
            leftImg.style.width = wrapper.offsetWidth + "px";
        }
        syncWidth();
        window.addEventListener("resize", syncWidth);

        range.addEventListener("input", () => {
            leftClip.style.width = range.value + "%";
            divider.style.left   = range.value + "%";
        });
    });

    // --------------------------------------------------------
    // Video carousels (one instance per data-carousel attribute)
    // --------------------------------------------------------
    document.querySelectorAll(".video-container").forEach(container => {
        const carouselId    = container.dataset.carousel;
        const prevBtn       = container.querySelector(".arrow.prev");
        const nextBtn       = container.querySelector(".arrow.next");
        const videosEl      = container.querySelector(".videos");
        const dotsContainer = document.querySelector(`.dots[data-dots="${carouselId}"]`);
        const slides        = container.querySelectorAll(".video-slide");
        const slideWidth    = 420; // 400px video + 20px padding
        let idx = 0;

        function updateDots() {
            dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === idx);
            });
        }

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                idx = i;
                videosEl.scrollTo({ left: idx * slideWidth, behavior: "smooth" });
                updateDots();
            });
            dotsContainer.appendChild(dot);
        });

        nextBtn.addEventListener("click", () => {
            if (idx < slides.length - 1) {
                idx++;
                videosEl.scrollBy({ left: slideWidth, behavior: "smooth" });
                updateDots();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (idx > 0) {
                idx--;
                videosEl.scrollBy({ left: -slideWidth, behavior: "smooth" });
                updateDots();
            }
        });
    });

    // Autoplay all videos
    document.querySelectorAll("video").forEach(v => v.play());
});
