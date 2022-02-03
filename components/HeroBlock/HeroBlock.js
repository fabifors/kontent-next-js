import React from 'react';
import BlockStyles from './HeroBlock.module.css'

const HeroBlock = ({ data }) => {
  const { title, description, label } = data;
  return (
    <div className="container hero">
      <h1 className={`title ${BlockStyles.title}`}>{title}</h1>
      <p className="description">{description}</p>
      {label && (
        <div className={`button ${BlockStyles.button}`}>
          <a href="#">{label}</a>
        </div>
      )}
    </div>
  );
};



export default HeroBlock;
