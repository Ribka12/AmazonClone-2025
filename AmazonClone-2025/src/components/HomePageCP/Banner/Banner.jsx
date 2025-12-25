import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerData from "../../../assets/img/data";
import style from "./banner.module.css";

function Banner() {
  return (
    <div className={style.banner}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
        transitionTime={500}
        stopOnHover={false}
        className="{style.carousel}"
      >
        {bannerData.map((item, id) => (
          <img src={item} key={id} alt={item.title} />
        ))}
      </Carousel>
      <div className={style.bannerBottom}></div>
    </div>
  );
}

export default Banner;
