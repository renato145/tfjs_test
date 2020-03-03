import React from 'react';
import { Alert } from 'react-bootstrap';

const Predictions = ({ predictions }) => ( 
  <>
    { predictions && (
      <Alert variant="primary">
        <ol>
          {predictions.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ol>
      </Alert>
    )}
  </>
 );

export default Predictions;
