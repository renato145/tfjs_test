import React, { forwardRef } from 'react';
import ReactCompareImage from 'react-compare-image';
import { Image } from 'react-bootstrap';

const ImageWithHeatmap = forwardRef(
  ({ imgURL, heatmapURL, className }, ref) => ( 
    <>
      <Image
        crossOrigin="anonymous"
        className={className}
        style={{display: heatmapURL ? 'none' : 'inherit'}}
        ref={ref}
        src={imgURL}
      />
      { heatmapURL && (
        <ReactCompareImage
          leftImage={imgURL}
          leftImageCss={{ position: 'static' }}
          rightImage={heatmapURL}
          className={className}
        />
      )}
    </>
  )
);

export default ImageWithHeatmap;
