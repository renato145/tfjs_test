import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const tensor = tf.randomNormal([10]);
  const [ showData, setShowData ] = useState();
  tensor.array().then(d => {
    console.log(d);
    setShowData(d[0]);
  })

  return (
    <Container>
      <Row>
        <Col>{showData}</Col>
      </Row>
    </Container>
  );
}

export default App;
