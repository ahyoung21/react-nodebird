import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';

// 함수는 func() 이렇게도 호출 가능하지만 ``으로도 호출 가능
// func``

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Header = styled.header`
  header: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }

  & button {
    positon: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;
const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

const Indicator = styled.div`
  text-align: center;

  & > div {
    display: inline-block;
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    text-aling: center;
    font-size: 15px;
    color: #fff;
  }
`;

const Global = createGlobalStyle`
	.slick-slide {
		display:inline-block
	}
`;

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
      </Header>
      <div>
        <SlickWrapper
          initialSlide={0}
          afterChange={(slide) => setCurrentSlide(slide)}
          infinite
          arrows={false}
          slidesToShow={1}
        >
          {images.map((image) => {
            return (
              <ImgWrapper key={image.src}>
                <img src={image.src} alt={image.src} />
              </ImgWrapper>
            );
          })}
        </SlickWrapper>
      </div>
    </Overlay>
  );
};

ImagesZoom.protoType = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
