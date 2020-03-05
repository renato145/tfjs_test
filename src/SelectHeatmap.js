import React, { useMemo } from 'react';
import './SelectHeatmap.css';
import { Col, Row } from 'react-bootstrap';

const SelectHeatmap = ({ heatmapLayers, onChange }) => {
  const showLayers = useMemo(() => {
    const re = /.*MobilenetV1\/(.*)\/Relu6/;
    return heatmapLayers.map(d => re.exec(d)[1])
  }, [ heatmapLayers ]);

  if (!heatmapLayers) return;
  return (
    <Row className="justify-content-start">
      <Col className='col-auto'>
        <label className='selection-label mb-0 ml-2'>Select heatmap layer</label>
        <select className='custom-select' onChange={e => onChange(+e.target.value)}>
          {showLayers.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>
      </Col>
    </Row>
  );
};

export default SelectHeatmap;
