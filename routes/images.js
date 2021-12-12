const express = require('express');
const tesseract = require('node-tesseract-ocr');
// const reader = new window.FileReader();
const Tesseract = require('tesseract.js');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

const router = express.Router();

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new global.FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

router.post('/get_text', (req, res) => {
  const img = req.body.data;

  Tesseract.recognize(img, 'eng', { logger: (m) => console.log(m) }).then(
    ({ data: { text } }) => {
      console.log(text);
    }
  );
});

module.exports = router;
