document.addEventListener('DOMContentLoaded', () => {

  function debounce(fn, t = 250) {
    let id;
    return (...a) => {
      clearTimeout(id);
      id = setTimeout(() => fn(...a), t);
    };
  }

  const photosSwiper = new Swiper(".my-photos-swiper", {
    effect: "slide",
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".my-photos-swiper .swiper-pagination",
      clickable: true
    },
    on: {
      slideChange: function () {
        const swiperEl = document.querySelector(".my-photos-swiper");
        if (!swiperEl) return;
        swiperEl.classList.remove("theme-1", "theme-2");
        const index = (this.realIndex % 2) + 1;
        swiperEl.classList.add(`theme-${index}`);
      }
    }
  });

  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer) {

    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

    if (swiperWrapper && !swiperWrapper.dataset.manualCloned) {

      const originalSlides = Array.from(swiperWrapper.querySelectorAll(':scope > .swiper-slide'));

      originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('manual-clone');
        swiperWrapper.appendChild(clone);
      });

      swiperWrapper.dataset.manualCloned = "1";
    }

    const stretchRatio = 0.045;
    const initialStretchValue = -(swiperContainer.offsetWidth * stretchRatio);

    const coverflowSwiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: initialStretchValue,
        depth: 100,
        modifier: 4.5,
        slideShadows: false,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
    });

    function updateSwiperStretch() {
      coverflowSwiper.params.coverflowEffect.stretch = -(swiperContainer.offsetWidth * stretchRatio);
      coverflowSwiper.update();
    }
    window.addEventListener("resize", debounce(updateSwiperStretch, 150));
  }

  const menuTrigger = document.querySelector(".menu-stick");
  const body = document.body;
  const html = document.documentElement;

  if (menuTrigger) {
    menuTrigger.addEventListener("click", () => {
      body.classList.toggle("menu-is-open");
      html.classList.toggle("menu-is-open");
    });
  }

  const allTracks = document.querySelectorAll('.carousel-track');
  allTracks.forEach(track => {
    const cards = Array.from(track.children);

    if (!track.dataset.manualCloned) {
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
      track.dataset.manualCloned = "1";
    }

    if (track.id === 'track2') {
      track.style.animation = "scroll-right 25s linear infinite";
    } else {
      track.style.animation = "scroll-left 25s linear infinite";
    }
  });
});