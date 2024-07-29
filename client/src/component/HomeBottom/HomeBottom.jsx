import React from 'react';
import bottomimg1 from '../../assets/bottomimg1.jpg';
import bottomimg2 from '../../assets/bottomimg2.jpg';
import bottomimg3 from '../../assets/bottomimg3.jpg';
import bottomimg4 from '../../assets/bottomimg4.jpg';
import bottomimg5 from '../../assets/bottomimg5.jpg';
import bottomimg6 from '../../assets/bottomimg6.jpg';
import bottomimg7 from '../../assets/bottomimg7.jpg';

const imageArray = [
    bottomimg1,
    bottomimg2,
    bottomimg3,
    bottomimg4,
    bottomimg5,
    bottomimg6,
    bottomimg7
];

const HomeBottom = () => {
  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        {imageArray.concat(imageArray).map((img, index) => (
          <img key={index} src={img} alt={`Image ${index}`} style={styles.image} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    overflow: 'hidden',
    // whiteSpace: 'nowrap',
    width: '100%',
    position: 'relative',
    display: 'flex',
    marginTop: '50px',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    animation: 'scroll 10s linear infinite',
  },
  image: {
    width: '200px',
    height: '300px',
    margin: '8px',
  },
};

const keyframes = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

// Inject the keyframes into the document's styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default HomeBottom;
