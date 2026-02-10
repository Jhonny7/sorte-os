import { useEffect, useState } from "react";
import "./style.scss";


declare let Swiper: any;

export default function CustomSwiper({
  cssClass = `${Math.round(Date.now() / 1000)}`,
  title = "",
  subtitle = "",
  hasTitle = false,
  hasPagination = false,
  breakpoints = null,
  slidesPerView = 1,
  spaceBetween = 1,
  extraClassTitle = "",
  hasArrow = false,
  hasScrollbar = false,
  breakpointsForContainer = true,
  loop = false,
  autoplay = false,
  effect = "fade",
  children,
}: {
  cssClass?: string;
  title?: string;
  subtitle?: string;
  hasTitle?: boolean;
  hasPagination?: boolean;
  breakpoints?: any;
  slidesPerView?: number;
  spaceBetween?: number;
  extraClassTitle?: string;
  hasArrow?: boolean;
  hasScrollbar?: boolean;
  breakpointsForContainer?: boolean;
  children: any;
  loop?: boolean;
  autoplay?: boolean;
  effect?: string;
}) {
  const [swiperRef, setSwiper] = useState<any>(null);
  const [isStart, setStart] = useState<boolean>(true);
  const [isEnd, setEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!breakpoints) {
      breakpoints = {
        640: {
          slidesPerView: slidesPerView,
          spaceBetween: spaceBetween,
        },
        768: {
          slidesPerView: slidesPerView,
          spaceBetween: spaceBetween,
        },
        1024: {
          slidesPerView: slidesPerView,
          spaceBetween: spaceBetween,
        },
      };
    }

    init();
  }, []);

  function init() {
    setTimeout(() => {
      const swiper = new Swiper(`.css-${cssClass}`, {
        // Optional parameters
        //effect: effect,
        loop: loop,
        initialSlide: 0,
        //grabCursor: true,
        centeredSlides: false,
        /* coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }, */
        direction: "horizontal",
        //loop: true,
        breakpointsBase: "container",

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },

        breakpoints: breakpoints,
        speed: 400,
        autoplay: autoplay
          ? {
              delay: 5000,
            }
          : false,
      });

      setSwiper(swiper);

      swiper.on("reachEnd", () => {
        setEnd(true);
        setStart(false);
      });

      swiper.on("reachBeginning", () => {
        setStart(true);
      });
    }, 1200);
  }

  function next() {
    setStart(false);
    swiperRef!.slideNext();
  }

  function prev() {
    setEnd(false);
    swiperRef!.slidePrev();
  }

  return (
    <div className="all-swip">
      {hasTitle && (
        <section
          className={`swp-title ${extraClassTitle} animated fadeInRight`}
        >
          {title && title.length && <p>{title}</p>}
          {subtitle && subtitle.length && (
            <p className="subtitle">{subtitle}</p>
          )}
        </section>
      )}
      <div className={`swiper css-${cssClass}`}>
        <div className="swiper-wrapper">{children}</div>
        {hasPagination && <div className="swiper-pagination"></div>}

        {hasArrow && <div className="swiper-button-prev"></div>}
        {hasArrow && <div className="swiper-button-next"></div>} 

        {hasScrollbar && <div className="swiper-scrollbar"></div>}
      </div>

      {swiperRef && !swiperRef.isBeginning && hasArrow && (
        <div className="custom-arrow" onClick={prev}>
          <div>
            <div></div>
          </div>
        </div>
      )}

      {!isEnd && hasArrow ? (
        <div className="custom-arrow right" onClick={next}>
          <div>
            <div></div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="shadow"></div>

      <div className="shadow shadow-right"></div>
    </div>
  );
}
