import * as React from 'react';

const Card = (props) => {
  return(
    <div className="card">
      <h4 className="card-header">{props.header}</h4>
      <div className="card-body">
        <p className="card-text">{props.text}</p>
        <a href="#" className="btn btn-primary">{props.button}</a>
      </div>
    </div>
  )
};

export default Card;
