import Slider from 'react-slick';
import styled from 'styled-components';

const CustomSlider = styled(Slider)`
  .slick-list {
    width: 100%;
  }

  .slick-track::before {
    width: 95%;
  }

  .slick-arrow::before {
    color: #ee6352;
  }
  .slick-active,
  .slick-current {
    margin: 0 auto;
  }
  .slick-slide {
    width: 95%;
  }

  .slick-slide:focus {
    outline: 0;
  }

  .slick-next {
    right: -10px;
  }

  .slick-right {
    left: -15px;
  }
`;

export default CustomSlider;
