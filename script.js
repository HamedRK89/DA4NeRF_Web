// Select all slider elements inside each .wrapper
document.querySelectorAll(".wrapper").forEach(wrapper => {
    const image = wrapper.querySelector(".image .image-2");
    const slider = wrapper.querySelector(".slider input");
    const drag = wrapper.querySelector(".slider .dragLine");

    // Update the image width and dragLine position when the slider moves
    slider.oninput = () => {
        let sliderVal = slider.value;
        drag.style.left = sliderVal + "%";
        image.style.width = sliderVal + "%";
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector(".arrow.prev");
    const nextButton = document.querySelector(".arrow.next");
    const videoContainer = document.querySelector(".videos");
    const dotsContainer = document.querySelector(".dots");
    const videoSlides = document.querySelectorAll(".video-slide");
    const slideWidth = 400 + 20; // 400px video width + 20px for padding
    let currentIndex = 0;
    const totalSlides = videoSlides.length;

    // Function to update active dot
    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // Create dots dynamically
    function createDots() {
        videoSlides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = index;
                videoContainer.scrollTo({ left: currentIndex * slideWidth, behavior: "smooth" });
                updateDots();
            });
            dotsContainer.appendChild(dot);
        });
    }

    nextButton.addEventListener("click", function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            videoContainer.scrollBy({ left: slideWidth, behavior: "smooth" });
            updateDots();
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            videoContainer.scrollBy({ left: -slideWidth, behavior: "smooth" });
            updateDots();
        }
    });

    createDots();
});




// Previous button click event
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        // Loop to the last set of slides
        currentIndex = videosContainer.children.length - visibleSlides;
    }
    updateVideos();
});

// Next button click event
nextButton.addEventListener("click", () => {
    if (currentIndex < videosContainer.children.length - visibleSlides) {
        currentIndex++;
    } else {
        // Loop to the first set of slides
        currentIndex = 0;
    }
    updateVideos();
});

// Ensure all videos are playing and looping
const allVideos = document.querySelectorAll(".video-slide video");
allVideos.forEach((video) => {
    video.loop = true; // Loop the video
    video.play(); // Autoplay the video
});

