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
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // --------------------------------------------------------
    // Image comparison sliders
    // --------------------------------------------------------
    document.querySelectorAll(".wrapper").forEach(wrapper => {
        const overlay = wrapper.querySelector(".img-overlay");
        const slider  = wrapper.querySelector(".slider input");
        const drag    = wrapper.querySelector(".slider .dragLine");

        slider.addEventListener("input", () => {
            drag.style.left        = slider.value + "%";
            overlay.style.clipPath = `inset(0 ${100 - slider.value}% 0 0)`;
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
