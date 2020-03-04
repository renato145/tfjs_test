import React, { useMemo } from 'react';

const SelectHeatmap = ({ heatmapLayers, onChange }) => {
  const showLayers = useMemo(() => {
    const re = /.*MobilenetV1\/(.*)\/Relu6/;
    return heatmapLayers.map(d => re.exec(d)[1])
  }, [ heatmapLayers ]);

  if (!heatmapLayers) return;
  return (
    <select className='custom-select' onChange={e => onChange(+e.value)}>
      {showLayers.map((d, i) => (
        <option key={i} value={i}>
          {d}
        </option>
      ))}
    </select>
  );
};

export default SelectHeatmap;
