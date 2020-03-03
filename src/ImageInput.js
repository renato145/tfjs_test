import React, { useState, useRef } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const ImageInput = ({
  className,
  defaultImg,
  setImgURL,
  onChangeImage,
  disableButtons = false,
}) => {
  const uploadImageRef = useRef();
  const [inputURL, setInputUrl] = useState(defaultImg);

  const handleUpload = e => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImgURL(url);
    setInputUrl(url);
    onChangeImage();
  };

  return (
    <InputGroup className={className}>
      <FormControl
        value={inputURL}
        onChange={e => setInputUrl(e.target.value)}
        onClick={() => setInputUrl('')}
        placeholder="Image url"
        aria-label="Image url"
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => {
            setImgURL(inputURL);
            onChangeImage();
          }}
          disabled={disableButtons}
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
          onChange={handleUpload}
        />
        <Button
          variant="outline-secondary"
          onClick={() => uploadImageRef.current.click()}
          disabled={disableButtons}
        >
          Upload image
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default ImageInput;
