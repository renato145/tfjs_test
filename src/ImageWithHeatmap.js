import React, { forwardRef } from 'react';
import ReactCompareImage from 'react-compare-image';
import { Image } from 'react-bootstrap';

const ImageWithHeatmap = forwardRef(
  ({ imgURL, heatmapURL, className }, ref) => ( 
    heatmapURL ? (
      <ReactCompareImage
        leftImage={imgURL}
        leftImageCss={{ position: 'static' }}
        rightImage={heatmapURL}
        className={className}
      />
    ) : (
      <Image
        crossOrigin="anonymous"
        className={className}
        ref={ref}
        src={imgURL}
      />
    )
  )
);

export default ImageWithHeatmap;
