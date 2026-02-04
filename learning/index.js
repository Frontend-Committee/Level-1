document.querySelectorAll(".slider").forEach(slider => {

    const track = slider.querySelector(".slides");
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const viewport = slider.querySelector(".viewport");
    const gap = 20;
    let index = 0;

    function getTotalWidth() {
    return slides.reduce((t, s) => t + s.offsetWidth, 0)
           + gap * (slides.length - 1);
    }

    function getOffset() {
    return slides
        .slice(0, index)
        .reduce((t, s) => t + s.offsetWidth + gap, 0);
    }

    function slideNext() {
    const maxOffset = getTotalWidth() - viewport.offsetWidth;
    if (getOffset() < maxOffset) {
        index++;
        track.style.transform =
        `translateX(-${Math.min(getOffset(), maxOffset)}px)`;
    }
    }  

    function slidePrev() {
    if (index > 0) {
        index--;
        track.style.transform =
        `translateX(-${getOffset()}px)`;
    }
    }

    slider.querySelector(".arrow.right")
        ?.addEventListener("click", slideNext);

    slider.querySelector(".arrow.left")
        ?.addEventListener("click", slidePrev);

  /* autoplay */
    setInterval(() => {
    const maxOffset = getTotalWidth() - viewport.offsetWidth;
    if (getOffset() < maxOffset) {
        slideNext();
    } else {
        index = 0;
        track.style.transform = "translateX(0)";
    }
    }, 4000);

});




// ===== Slider Two =====
const trackTwo = document.querySelector(".slidestwo");
const slidesTwo = Array.from(document.querySelectorAll(".slidetwo"));
const viewportTwo = document.querySelector(".viewporttwo");
const gapTwo = 20;

let indexTwo = 0;

// حساب العرض الكلي لكل الصور
function getTotalWidthTwo() {
    return slidesTwo.reduce((total, slide) => {
        return total + slide.offsetWidth;
    }, 0) + gapTwo * (slidesTwo.length - 1);
}

// حساب الإزاحة الحالية
function getOffsetTwo() {
    let offset = 0;
    for (let i = 0; i < indexTwo; i++) {
        offset += slidesTwo[i].offsetWidth + gapTwo;
    }
    return offset;
}

// السهم اليمين
function slideNextTwo() {
    const maxOffset = getTotalWidthTwo() - viewportTwo.offsetWidth;

    if (getOffsetTwo() < maxOffset) {
        indexTwo++;
        trackTwo.style.transform =
            `translateX(-${Math.min(getOffsetTwo(), maxOffset)}px)`;
    }
}

// السهم الشمال
function slidePrevTwo() {
    if (indexTwo > 0) {
        indexTwo--;
        trackTwo.style.transform =
            `translateX(-${getOffsetTwo()}px)`;
    }
}

// ربط الأسهم
document.querySelector(".arrowtwo.righttwo")
    .addEventListener("click", slideNextTwo);

document.querySelector(".arrowtwo.lefttwo")
    .addEventListener("click", slidePrevTwo);

setInterval(() => {
    const maxOffset = getTotalWidthTwo() - viewportTwo.offsetWidth;

    if (getOffsetTwo() > 0) {
        indexTwo--;
        trackTwo.style.transform =
            `translateX(-${getOffsetTwo()}px)`;
    } else {
        // نرجع لأقصى مكان مسموح بدل آخر صورة
        let offset = 0;
        indexTwo = 0;

        while (offset < maxOffset) {
            offset += slidesTwo[indexTwo].offsetWidth + gapTwo;
            indexTwo++;
        }

        indexTwo--; // خطوة رجوع عشان ما نعديش
        trackTwo.style.transform =
            `translateX(-${maxOffset}px)`;
    }
}, 4500);






const AUTOPLAY_TIME = 2800; // أقل وأنعم

setInterval(() => {

    /* ===== Slider One ===== */
    document.querySelectorAll(".slider").forEach(slider => {

        const track = slider.querySelector(".slides");
        const slides = Array.from(slider.querySelectorAll(".slide"));
        const viewport = slider.querySelector(".viewport");
        const gap = 20;

        if (!slides.length) return;

        let index = slider.dataset.index ? +slider.dataset.index : 0;

        const getTotalWidth = () =>
            slides.reduce((t, s) => t + s.offsetWidth, 0) + gap * (slides.length - 1);

        const getOffset = () =>
            slides.slice(0, index).reduce((t, s) => t + s.offsetWidth + gap, 0);

        const maxOffset = getTotalWidth() - viewport.offsetWidth;

        if (getOffset() < maxOffset) {
            index++;
            track.style.transform =
                `translateX(-${Math.min(getOffset(), maxOffset)}px)`;
        } else {
            index = 0;
            track.style.transform = "translateX(0)";
        }

        slider.dataset.index = index;
    });

    /* ===== Slider Two (عكس الاتجاه) ===== */
    const maxOffsetTwo =
        getTotalWidthTwo() - viewportTwo.offsetWidth;

    if (getOffsetTwo() > 0) {
        indexTwo--;
        trackTwo.style.transform =
            `translateX(-${getOffsetTwo()}px)`;
    } else {
        trackTwo.style.transform =
            `translateX(-${maxOffsetTwo}px)`;

        let offset = 0;
        indexTwo = 0;

        while (offset < maxOffsetTwo) {
            offset += slidesTwo[indexTwo].offsetWidth + gapTwo;
            indexTwo++;
        }

        indexTwo--;
    }

}, AUTOPLAY_TIME);

