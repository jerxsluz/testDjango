import { SliderItem, Wrapper } from "./LayoutBanner-styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LayoutBannerUI(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>  {/* ...settings란 settings의 속성 다 가져오기 귀찮으니까 저거 한 번에 다 적용하겠다는 뜻 */}
        <div>
          <SliderItem src="/images/layout/banner01.png" />
        </div>
        <div>
          <SliderItem src="/images/layout/banner01.png" />
        </div>
        <div>
          <SliderItem src="/images/layout/banner01.png" />
        </div>
      </Slider>
    </Wrapper>
  );
}
