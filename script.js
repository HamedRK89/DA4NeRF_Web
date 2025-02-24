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


// Video Row Slider
const videosContainer = document.querySelector(".videos");
const prevButton = document.querySelector(".video-container .arrow.prev");
const nextButton = document.querySelector(".video-container .arrow.next");

let currentIndex = 0;
const slideWidth = 400; // Width of each video slide
const visibleSlides = 3; // Number of slides visible at a time

// Function to update the video slider position
function updateVideos() {
    const offset = -currentIndex * slideWidth;
    videosContainer.style.transform = `translateX(${offset}px)`;
}

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

