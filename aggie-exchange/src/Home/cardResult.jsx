import React from 'react';
import Card from './Card';
import '../css/cardList.css';
import axios from"axios";

const CardList = ({ cards }) => {

  return (
    <div className="card-list-container">
      <div className="card-list">
        {cards.map(card => (
          <Card
            key={card._id}
            course_id={card.course_id}
            course_name={card.course_name}
            object_id={card._id}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
