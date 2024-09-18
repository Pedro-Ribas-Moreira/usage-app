var swiper = new Swiper('.swiper-container', {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 1,
  // If you want pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },

  // If you want navigation buttons
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
