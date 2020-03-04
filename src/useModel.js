import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';

const IMAGE_SIZE = 224;

export const tensorToDataURL = tensor =>
  new Promise(resolve => {
    const canvas = document.createElement('canvas');
    tf.browser.toPixels(tensor, canvas).then(() => {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i++) {
        if ([1, 2].includes(i % 4)) data[i] = 0;
        if (i % 4 === 3) data[i] = 127;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    });
  });

// view layer and shape:
//  const shape = model.model.execute(batched, name).shape;
//  console.log(`${name}: ${shape}`);
export const getHeatmapLayers = model =>
  model.model.artifacts.modelTopology.node
    .filter(d => d.name.includes('pointwise/Relu6'))
    .map(d => d.name);

export const getHeatmap = ({ model, x, layerName }) =>
  tf.tidy(() => {
    const img = tf.browser.fromPixels(x);
    const normalized = img
      .toFloat()
      .mul(model.normalizationConstant)
      .add(model.inputMin);
    let resized = normalized;
    const originalShape = img.shape;
    if (img.shape[0] !== IMAGE_SIZE || img.shape[1] !== IMAGE_SIZE) {
      const alignCorners = true;
      resized = tf.image.resizeBilinear(
        normalized,
        [IMAGE_SIZE, IMAGE_SIZE],
        alignCorners
      );
    }
    const batched = resized.reshape([-1, IMAGE_SIZE, IMAGE_SIZE, 3]);
    let heatmap = model.model.execute(batched, layerName).mean([0, -1]);
    heatmap = heatmap.sub(heatmap.min());
    heatmap = heatmap.div(heatmap.max());
    console.log(heatmap.shape);
    return heatmap
      .expandDims(-1)
      .resizeBilinear(originalShape.slice(0, 2), true);
  });

export const classifyImage = ({ model, img, setPredictions }) => {
  model.classify(img).then(pred => {
    console.log('Predictions:');
    console.log(pred);
    const res = pred.map(d => `${d.className} (${d.probability.toFixed(2)})`);
    setPredictions(res);
  });
};

const useModel = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    mobilenet.load().then(model => {
      setModel(model);
      console.log('model loaded');
    });
  }, []);

  return model;
};

export default useModel;
