// Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2, // Adjust the scroll duration for smoothness
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Customize easing
  smooth: true, // Enable smooth scrolling
});

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP Animation
gsap.registerPlugin(ScrollTrigger);

// Select all image containers
let elements = document.querySelectorAll(".relative");

elements.forEach((elem) => {
  let image = elem.querySelector("img");

  if (image) {
    let tl = gsap.timeline();

    let XTransform = gsap.utils.random(-100, 100); // Random value for X-axis transformation

    tl.set(image, {
      transformOrigin: `${XTransform < 0 ? 0 : "100%"}`, // Set transform origin based on XTransform
    })
      .to(
        image,
        {
          scale: 0, // Shrink image to 0 on scroll
          ease: "none",
          scrollTrigger: {
            trigger: image, // Trigger animation when scrolling past the image
            start: "top top", // When the top of the image hits the top of the viewport
            end: "bottom top", // End when the bottom of the image reaches the top
            scrub: true, // Smooth scrubbing based on scroll
          },
        },
        "start"
      )
      .to(
        elem,
        {
          xPercent: XTransform,
          ease: "none",
          scrollTrigger: {
            trigger: image, // Trigger animation when scrolling past the image
            start: "top bottom", // When the top of the image hits the top of the viewport
            end: "bottom top", // End when the bottom of the image reaches the top
            scrub: true, // Smooth scrubbing based on scroll
          },
        },
        "start"
      );
  }
});
