/* =========================================================
   CVSTech
   main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     HERO CAROUSEL
  ======================================================= */

  const hero = document.querySelector(".hero");

  const slides = Array.from(
    document.querySelectorAll(".hero-carousel-slide")
  );

  const dots = Array.from(
    document.querySelectorAll(".hero-carousel-dot")
  );

  const modelName = document.querySelector(
    "#hero-model-name"
  );


  /* =======================================================
     CAR MODELS
  ======================================================= */

  const models = [
    "LiXiang L7",
    "LiXiang L9",
    "Geely EX5"
  ];


  /* =======================================================
     SETTINGS
  ======================================================= */

  const AUTOPLAY_DELAY = 5000;

  let currentSlide = 0;
  let autoplayTimer = null;


  /* =======================================================
     SHOW SLIDE
  ======================================================= */

  function showSlide(index) {

    if (slides.length === 0) {
      return;
    }


    /*
      Благодаря этой формуле:
      после последнего слайда снова
      открывается первый.
    */

    currentSlide =
      (index + slides.length) % slides.length;


    /* -----------------------
       Slides
    ----------------------- */

    slides.forEach((slide, slideIndex) => {

      const isActive =
        slideIndex === currentSlide;

      slide.classList.toggle(
        "is-active",
        isActive
      );

    });


    /* -----------------------
       Navigation dots
    ----------------------- */

    dots.forEach((dot, dotIndex) => {

      const isActive =
        dotIndex === currentSlide;

      dot.classList.toggle(
        "is-active",
        isActive
      );

      dot.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    });


    /* -----------------------
       Current model label
    ----------------------- */

    if (
      modelName &&
      models[currentSlide]
    ) {

      modelName.textContent =
        models[currentSlide];

    }

  }


  /* =======================================================
     NEXT SLIDE
  ======================================================= */

  function nextSlide() {

    showSlide(
      currentSlide + 1
    );

  }


  /* =======================================================
     PREVIOUS SLIDE
     Уже готово на случай, если позже добавим стрелку ←
  ======================================================= */

  function previousSlide() {

    showSlide(
      currentSlide - 1
    );

  }


  /* =======================================================
     STOP AUTOPLAY
  ======================================================= */

  function stopAutoplay() {

    if (autoplayTimer === null) {
      return;
    }

    window.clearInterval(
      autoplayTimer
    );

    autoplayTimer = null;

  }


  /* =======================================================
     START AUTOPLAY
  ======================================================= */

  function startAutoplay() {

    /*
      Сначала удаляем предыдущий timer,
      чтобы случайно не запустить
      несколько каруселей одновременно.
    */

    stopAutoplay();


    autoplayTimer =
      window.setInterval(
        nextSlide,
        AUTOPLAY_DELAY
      );

  }


  /* =======================================================
     RESET AUTOPLAY
  ======================================================= */

  function resetAutoplay() {

    stopAutoplay();
    startAutoplay();

  }


  /* =======================================================
     DOT NAVIGATION
  ======================================================= */

  dots.forEach((dot) => {

    dot.addEventListener(
      "click",
      () => {

        const slideIndex =
          Number(
            dot.dataset.slideIndex
          );


        if (
          Number.isNaN(slideIndex)
        ) {

          return;

        }


        showSlide(
          slideIndex
        );


        /*
          После ручного переключения
          снова начинаем отсчёт 5 секунд.
        */

        resetAutoplay();

      }
    );

  });


  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  if (hero) {

    hero.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "ArrowRight"
        ) {

          nextSlide();
          resetAutoplay();

        }


        if (
          event.key === "ArrowLeft"
        ) {

          previousSlide();
          resetAutoplay();

        }

      }
    );

  }


  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  /*
    Не продолжаем менять картинки,
    пока пользователь находится
    в другой вкладке или приложении.
  */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        stopAutoplay();

        return;

      }


      startAutoplay();

    }
  );


  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  /*
    Показываем первый слайд
    сразу после загрузки страницы.
  */

  showSlide(0);


  /*
    Автоматическую смену запускаем,
    только если пользователь
    не попросил уменьшить анимации.
  */

  if (!reducedMotion.matches) {

    startAutoplay();

  }


  /* =======================================================
     REDUCED MOTION CHANGE
  ======================================================= */

  reducedMotion.addEventListener(
    "change",
    (event) => {

      if (event.matches) {

        stopAutoplay();

      } else {

        startAutoplay();

      }

    }
  );

});