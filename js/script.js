//!Disable save as & open in new tab start
document.addEventListener('contextmenu', event => event.preventDefault());
//!Disable save as & open in new tab end

//!Disable zoom in & out start
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '=')) {
        event.preventDefault();
    }
});

document.getElementById('containers').addEventListener('wheel', event => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, true);
//!Disable zoom in & out end

//!disable scrolling start
document.querySelector('#containers').addEventListener('wheel', preventScroll, { passive: false });
function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

var delayInMilliseconds = 8000;
setTimeout(function enableScroll() {
    document.querySelector('#containers').removeEventListener('wheel', preventScroll);
}, delayInMilliseconds);
//!disable scrolling end

//?Reset scroll at top on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

//*button anim start

gsap.ticker.lagSmoothing(false); //enable gsap animation when switching tabs

function stopAllMarquees() {
    var marquees = document.getElementsByTagName("marquee");
    for (var i = 0; i < marquees.length; i++) {
        marquees[i].stop();
    }
    // !enable scroll on click
    enableScroll();
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
    gsap.to(".btn", 1, {
        opacity: 0,
        y: -400,
        ease: Expo.easeInOut,
        disabled: true,
        cursor: 'default',

    });

    gsap.to(".text-wrapper > div", 1, {
        x: "500",
        ease: Expo.easeInOut,
        delay: 1,
        stagger: 0.1,
    });

    gsap.to(".text-wrapper", 3, {
        y: -600,
        scale: 4.5,
        rotate: -90,
        ease: Expo.easeInOut,
        delay: 1.5
    });

    gsap.to(".text", 1, {
        opacity: 1,
        ease: Expo.easeInOut,
        delay: 3,
    });

    gsap.to(".text-wrapper > div", 4, {
        x: "-3500",
        ease: Expo.easeInOut,
        delay: 3.5,
        stagger: 0.05,
    });

    gsap.to(".text-container", 2, {
        bottom: "-100%",
        ease: Expo.easeInOut,
        delay: 6,
    });
    //* The .text opacity will be 0 in 6
    gsap.to(".text", 1, {
        opacity: 0,
        ease: Expo.easeInOut,
        delay: 6,
    });

    //reset text position when reload
    ScrollTrigger.clearScrollMemory();
    window.history.scrollRestoration = "manual";
});
//*button anim end

//*vertical scroll start
gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".Horizslide");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".Main-sliders",
        pin: ".header",
        pinSpacing: true,
        scrub: 1,
        end: "+=3000",
    }
});
//*vertical scroll end

// Define wiggle animation
const wiggleAnimation = gsap.timeline({
    repeat: -1,
    yoyo: true,
    paused: true,
    defaults: {
        ease: 'power1.inOut',
    },
}).to('.polarME', {
    duration: 1,
    rotation: 15,
    repeat: 2,
    yoyo: true,
});

const wiggleAnimationA = gsap.timeline({
    repeat: -1,
    yoyo: true,
    paused: true,
    defaults: {
        ease: 'power1.inOut',
    },
}).to('.abtme', {
    duration: 1,
    rotation: 15,
    repeat: 2,
    yoyo: true,
});


// Define scroll trigger
ScrollTrigger.create({
    trigger: '.Main-sliders',
    start: 'top bottom-=100',
    onEnter: () => wiggleAnimation.play(),
    onLeaveBack: () => wiggleAnimation.reverse(),
});

ScrollTrigger.create({
    trigger: '.Main-sliders',
    start: 'top bottom-=100',
    onEnter: () => wiggleAnimationA.play(),
    onLeaveBack: () => wiggleAnimationA.reverse(),
});