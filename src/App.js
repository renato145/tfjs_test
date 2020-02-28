import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './App.css';
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Image,
  Alert,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';

const exampleImage =
  'https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg';

const App = () => {
  const imgRef = useRef();
  const uploadImageRef = useRef();
  const [imgUrl, setImgUrl] = useState(exampleImage);
  const [imgCurrent, setImgCurrent] = useState(exampleImage);
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState();

  useEffect(() => {
    mobilenet.load().then(model => {
      setModel(model);
      console.log('model loaded');
    });
  }, []);

  useEffect(() => {
    setPredictions('');
  }, [imgCurrent]);

  const loadImage = () => {
    setImgCurrent(imgUrl);
  };

  const uploadImage = e => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImgCurrent(url);
    setImgUrl(url);
  };

  const classifyImage = () => {
    model.classify(imgRef.current).then(pred => {
      console.log('Predictions:');
      console.log(pred);
      const res = pred.map(d => `${d.className} (${d.probability.toFixed(2)})`);
      setPredictions(res);
    });
  };

  return (
    <Container>
      <header>
        <h1 className="mt-4 mb-4">tfjs test</h1>
      </header>

      <main>
        <InputGroup className="mb-3">
          <FormControl
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            onClick={() => setImgUrl('')}
            onBlur={() => setImgUrl(imgCurrent)}
            placeholder="Image url"
            aria-label="Image url"
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={loadImage}
              disabled={!model}
            >
              Load image url
            </Button>
          </InputGroup.Append>
          <InputGroup.Append>
            <input
              ref={uploadImageRef}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={uploadImage}
            />
            <Button
              variant="outline-secondary"
              onClick={() => uploadImageRef.current.click()}
              disabled={!model}
            >
              Upload image
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Row className="justify-content-center">
          <Col md={8}>
            <Image
              crossOrigin="anonymous"
              className="w-100 mb-2"
              ref={imgRef}
              src={imgCurrent}
            />
            <div className="mb-2 ml-2">
              <Button
                variant="outline-secondary"
                onClick={classifyImage}
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
            {predictions && (
              <Alert variant="primary">
                <ol>
                  {predictions.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ol>
              </Alert>
            )}
          </Col>
        </Row>
        <div className="justify-content-end"></div>
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
