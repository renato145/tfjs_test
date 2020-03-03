import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ImageInput from './ImageInput';
import ImageWithHeatmap from './ImageWithHeatmap';
import useModel, { classifyImage } from './useModel';
import Predictions from './Predictions';
import './App.css';

const exampleImage =
  'https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg';

const App = () => {
  const imgRef = useRef();
  const [imgURL, setImgURL] = useState(exampleImage);
  const [heatmapURL, setHeatmapURL] = useState();
  const [predictions, setPredictions] = useState();
  const model = useModel();

  return (
    <Container>
      <header>
        <h1 className="mt-4 mb-4">tfjs test</h1>
      </header>

      <main>
        <ImageInput
          className="mb-3"
          defaultImg={exampleImage}
          imgURL={imgURL}
          setImgURL={setImgURL}
          onChangeImage={() => {
            setHeatmapURL(undefined);
            setPredictions(undefined);
          }}
          disableButtons={!model}
        />
        <Row className="justify-content-center">
          <Col lg={9}>
            <ImageWithHeatmap
              className="w-100 mb-2"
              imgURL={imgURL}
              heatmapURL={heatmapURL}
              ref={imgRef}
            />
            {!heatmapURL && (
              <div className="mb-2 ml-2">
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    classifyImage({
                      model,
                      img: imgRef.current,
                      setPredictions,
                      setHeatmapURL,
                    })
                  }
                  disabled={!model}
                >
                  {model ? (
                    'Classify this!'
                  ) : (
                    <>
                      Loading model... <Spinner animation="border" size="sm" />
                    </>
                  )}
                </Button>
              </div>
            )}
            <Predictions predictions={predictions} />
          </Col>
        </Row>
      </main>

      <footer>
        <Row>
          <Col className="mt-4 text-right">
            <a href="https://github.com/renato145/tfjs_test" target="_black">
              Source code
            </a>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default App;
