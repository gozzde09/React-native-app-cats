// API Doc :https://developers.thecatapi.com

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image} from "react-native";

export default function CatImage ({ referenceImageId, style }) {
  const [imageUri, setImageUri] = useState(null);
  // Images är jpg eller png
  useEffect(() => {
    const checkImageFormat = async () => {
      try {
        let jpgUri = `https://cdn2.thecatapi.com/images/${referenceImageId}.jpg`;
        let response = await fetch(jpgUri);
        if (response.ok) {
          setImageUri(jpgUri);
        } else {
          let pngUri = `https://cdn2.thecatapi.com/images/${referenceImageId}.png`;
          response = await fetch(pngUri);
          if (response.ok) {
            setImageUri(pngUri);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkImageFormat();
  }, [referenceImageId]);

  return (
    <Image
      style={ style}
      source={{ uri: imageUri }}
      resizeMode='cover'
    />
  );
}

CatImage.propTypes = {
  referenceImageId: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};
