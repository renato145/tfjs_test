import 'bootstrap/dist/css/bootstrap.css';
import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './ImageHeatmap.css';

const ImageHeatmap = () => {
  const canvasRef = useRef();
  const imgRef = useRef();
  const [size, setSize] = useState();
  const [progress, setProgress] = useState(0.5);

  const handleImageLoad = e => {
    setSize({
      width: e.target.width,
      height: e.target.height,
    });
    console.log(size);
  };

  const handleMoveWrapper = e => {
    e.preventDefault();
    let { offsetX } = e.nativeEvent;
    if (!offsetX) {
      const rect = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].pageX - rect.left;
    }
    const { width } = size;
    setProgress(Math.max(0, Math.min(1, (offsetX - width / 10) / width)));
  };

  const handleMoveContent = e => {
    e.preventDefault();
    let { offsetX } = e.nativeEvent;
    if (!offsetX) {
      const rect = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].pageX - rect.left;
    }
    const { width } = size;
    setProgress(Math.max(0, Math.min(1, offsetX / width)));
  };

  // draw sample
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(imgRef.current);
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={9}>
          <div className="container" style={{ ...size }}>
            <div
              className="image-wrapper"
              style={{ width: `${100 * progress}%` }}
            >
              <Image
                ref={imgRef}
                src="https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg"
                className="image"
                onLoad={handleImageLoad}
              />
            </div>
            <canvas ref={canvasRef} className="heatmap" />
            <div className="handle" style={{ left: `${100 * progress}%` }} />
            <div
              className="wrapper"
              onTouchMove={handleMoveWrapper}
              onMouseMove={handleMoveWrapper}
            />
            <div
              className="content"
              onTouchMove={handleMoveContent}
              onMouseMove={handleMoveContent}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageHeatmap;
