import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './App.css';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image,
  Alert,
} from 'react-bootstrap';

const exampleImage =
  'https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg';

const App = () => {
  const imgRef = useRef();
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

  const loadImage = () => {
    setImgCurrent(imgUrl);
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
      <Row>
        <Col>
          <h1 className="mt-4 mb-4">tfjs test</h1>
          <InputGroup className="w-75 mb-3">
            <FormControl
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              placeholder="Image url"
              aria-label="Image url"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={loadImage}>
                Load image
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Image
            crossOrigin="anonymous"
            className="w-75"
            ref={imgRef}
            src={imgCurrent}
          />
          <div className="justify-content-end">
            <Button variant="outline-secondary" onClick={classifyImage}>Classify this!</Button>
          </div>
          { predictions && (
            <Alert variant='primary' className='w-75'>
              <ol>
                {predictions.map((d, i) => <li key={i}>{d}</li>)}
              </ol>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
