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
  /* =======================================================
     COOKIE CONSENT
  ======================================================= */

  const COOKIE_CONSENT_KEY =
    "cvstech_cookie_consent";


  const cookieBanner =
    document.querySelector(
      "#cookie-banner"
    );


  const cookieModal =
    document.querySelector(
      "#cookie-modal"
    );


  const cookieAccept =
    document.querySelector(
      "#cookie-accept"
    );


  const cookieReject =
    document.querySelector(
      "#cookie-reject"
    );


  const cookieSettings =
    document.querySelector(
      "#cookie-settings"
    );


  const cookieModalClose =
    document.querySelector(
      "#cookie-modal-close"
    );


  const cookieModalReject =
    document.querySelector(
      "#cookie-modal-reject"
    );


  const cookieSave =
    document.querySelector(
      "#cookie-save"
    );


  const analyticsCheckbox =
    document.querySelector(
      "#cookie-analytics"
    );


  const marketingCheckbox =
    document.querySelector(
      "#cookie-marketing"
    );


  /* =======================================================
     READ CONSENT
  ======================================================= */

  function getCookieConsent() {

    try {

      const savedConsent =
        window.localStorage.getItem(
          COOKIE_CONSENT_KEY
        );


      if (!savedConsent) {
        return null;
      }


      return JSON.parse(
        savedConsent
      );

    } catch (error) {

      console.error(
        "CVSTechPL cookie consent read error:",
        error
      );


      return null;

    }

  }


  /* =======================================================
     SAVE CONSENT
  ======================================================= */

  function saveCookieConsent(
    analytics,
    marketing
  ) {

    const consent = {

      necessary: true,

      analytics:
        Boolean(analytics),

      marketing:
        Boolean(marketing),

      updatedAt:
        new Date().toISOString()

    };


    try {

      window.localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify(consent)
      );

    } catch (error) {

      console.error(
        "CVSTechPL cookie consent save error:",
        error
      );

    }


    applyCookieConsent(
      consent
    );


    hideCookieBanner();

    closeCookieModal();

  }


  /* =======================================================
     APPLY CONSENT
  ======================================================= */

  function applyCookieConsent(
    consent
  ) {

    if (!consent) {
      return;
    }


    /*
      FUTURE ANALYTICS

      Google Analytics / Microsoft Clarity
      możemy później uruchomić tutaj:

      if (consent.analytics) {
        // Load analytics
      }
    */


    /*
      FUTURE MARKETING

      Meta Pixel / inne technologie marketingowe
      możemy później uruchomić tutaj:

      if (consent.marketing) {
        // Load marketing scripts
      }
    */


    window.dispatchEvent(
      new CustomEvent(
        "cvstechConsentUpdated",
        {
          detail: consent
        }
      )
    );

  }


  /* =======================================================
     SHOW COOKIE BANNER
  ======================================================= */

  function showCookieBanner() {

    if (!cookieBanner) {
      return;
    }


    cookieBanner.hidden =
      false;

  }


  /* =======================================================
     HIDE COOKIE BANNER
  ======================================================= */

  function hideCookieBanner() {

    if (!cookieBanner) {
      return;
    }


    cookieBanner.hidden =
      true;

  }


  /* =======================================================
     OPEN COOKIE SETTINGS
  ======================================================= */

  function openCookieModal() {

    if (!cookieModal) {
      return;
    }


    const currentConsent =
      getCookieConsent();


    if (analyticsCheckbox) {

      analyticsCheckbox.checked =
        Boolean(
          currentConsent?.analytics
        );

    }


    if (marketingCheckbox) {

      marketingCheckbox.checked =
        Boolean(
          currentConsent?.marketing
        );

    }


    cookieModal.hidden =
      false;


    document.body.style.overflow =
      "hidden";

  }


  /* =======================================================
     CLOSE COOKIE SETTINGS
  ======================================================= */

  function closeCookieModal() {

    if (!cookieModal) {
      return;
    }


    cookieModal.hidden =
      true;


    document.body.style.overflow =
      "";

  }


  /* =======================================================
     ACCEPT ALL
  ======================================================= */

  if (cookieAccept) {

    cookieAccept.addEventListener(
      "click",
      () => {

        saveCookieConsent(
          true,
          true
        );

      }
    );

  }


  /* =======================================================
     REJECT OPTIONAL
  ======================================================= */

  if (cookieReject) {

    cookieReject.addEventListener(
      "click",
      () => {

        saveCookieConsent(
          false,
          false
        );

      }
    );

  }


  /* =======================================================
     OPEN SETTINGS
  ======================================================= */

  if (cookieSettings) {

    cookieSettings.addEventListener(
      "click",
      openCookieModal
    );

  }


  /* =======================================================
     CLOSE SETTINGS
  ======================================================= */

  if (cookieModalClose) {

    cookieModalClose.addEventListener(
      "click",
      closeCookieModal
    );

  }


  /* =======================================================
     CLICK BACKDROP
  ======================================================= */

  if (cookieModal) {

    const cookieBackdrop =
      cookieModal.querySelector(
        ".cookie-modal-backdrop"
      );


    if (cookieBackdrop) {

      cookieBackdrop.addEventListener(
        "click",
        closeCookieModal
      );

    }

  }


  /* =======================================================
     REJECT ALL FROM SETTINGS
  ======================================================= */

  if (cookieModalReject) {

    cookieModalReject.addEventListener(
      "click",
      () => {

        saveCookieConsent(
          false,
          false
        );

      }
    );

  }


  /* =======================================================
     SAVE CUSTOM SETTINGS
  ======================================================= */

  if (cookieSave) {

    cookieSave.addEventListener(
      "click",
      () => {

        const analytics =
          analyticsCheckbox
            ? analyticsCheckbox.checked
            : false;


        const marketing =
          marketingCheckbox
            ? marketingCheckbox.checked
            : false;


        saveCookieConsent(
          analytics,
          marketing
        );

      }
    );

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        cookieModal &&
        !cookieModal.hidden
      ) {

        closeCookieModal();

      }

    }
  );


  /* =======================================================
     INITIAL COOKIE STATE
  ======================================================= */

  const existingCookieConsent =
    getCookieConsent();


  if (existingCookieConsent) {

    applyCookieConsent(
      existingCookieConsent
    );

  } else {

    showCookieBanner();

  }
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
document.getElementById("policy-link").innerHTML = 'policy/';