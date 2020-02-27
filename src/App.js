import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
import './App.css';
import { Container, Row, Col, InputGroup, FormControl, Button, Image } from 'react-bootstrap';

const exampleImage = 'https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg'

const App = () => {
  const [ imgUrl, setImgUrl ] = useState(exampleImage);
  const [ imgCurrent, setImgCurrent ] = useState(exampleImage);
  const loadImage = () => {
    setImgCurrent(imgUrl);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='mt-4 mb-4'>tfjs test</h1>
          <InputGroup className='w-75 mb-3'>
            <FormControl
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              placeholder='Image url'
              aria-label='Image url'
            />
            <InputGroup.Append>
              <Button variant='outline-secondary' onClick={loadImage}>Load image</Button>
            </InputGroup.Append>
          </InputGroup>
          <Image className='w-75' src={imgCurrent} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
