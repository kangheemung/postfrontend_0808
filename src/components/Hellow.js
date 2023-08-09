import React from 'react';

const names = ['hi', '안녕하세요', 'こんにちは', 'wow', '와우', 'わおー'];

function Hellow() {
  const chosenName = Math.random() > 0.5 ? names[0] : Math.random() > 0.5 ? names[1] : Math.random() > 0.5 ? names[2] : Math.random() > 0.5 ? names[3] : Math.random() > 0.5 ? names[4] : names[5];
  
  return (
    <>
      <h1>{chosenName}</h1>
    </>
  );
};

export default Hellow;
