// Carousel
var emblaNode = document.getElementById("embla");
const options = { loop: true }
var embla = (window as any).EmblaCarousel(emblaNode, options);

var arrowNextCarouselSlide = document.getElementById("arrowNextSlide");
var arrowPrevCarouselSlide = document.getElementById("arrowPrevSlide");

arrowNextCarouselSlide.addEventListener("click", carouselNextSlide);
arrowPrevCarouselSlide.addEventListener("click", carouselPrevSlide);

function carouselNextSlide() {
    (embla as any).scrollNext();
}

function carouselPrevSlide() {
    (embla as any).scrollPrev();
}

// Mobile Menu
var btnShowMobileMenu = document.getElementById("btnShowMobileMenu");
var btnHideMobileMenu = document.getElementById("btnHideMobileMenu");
var mobileMenu = document.getElementById("mobileMenu");

btnShowMobileMenu.addEventListener("click", disableScroll);
btnHideMobileMenu.addEventListener("click", enableScroll);


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }

    return true;
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    btnShowMobileMenu.style.display = 'none';
    mobileMenu.style.display = 'flex';
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
    addStopScrollingClass();
}

// call this to Enable
function enableScroll() {
    btnShowMobileMenu.style.display = 'block';
    mobileMenu.style.display = 'none';
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener((wheelEvent as any), preventDefault, (wheelOpt as any));
    window.removeEventListener('touchmove', preventDefault, (wheelOpt as any));
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    removeStopScrollingClass();
}

function addStopScrollingClass() {
    var html = document.getElementsByTagName("html")[0];
    var body = document.getElementsByTagName("body")[0];
    html.classList.add("stop-scrolling");
    body.classList.add("stop-scrolling");
}

function removeStopScrollingClass() {
    var html = document.getElementsByTagName("html")[0];
    var body = document.getElementsByTagName("body")[0];
    html.classList.remove("stop-scrolling");
    body.classList.remove("stop-scrolling");
}