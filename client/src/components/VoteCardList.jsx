import React, { useState, useEffect } from 'react';
import { CardDeck } from 'react-bootstrap';
import VoteCard from './VoteCard';

export default function VoteCardList({ values, onCardSelected, selectable }) {
  const [cardSelected, setCardSelected] = useState(null);

  const isSelected = (idx) => {
    return cardSelected === idx;
  }

  const handleCardClick = (idx, value) => {
    if (!selectable) return;
    // only send selection if card has changed
    if (!isSelected(idx)) {
      onCardSelected(value);
    }

    setCardSelected(idx);
  }

  useEffect(() => {
    setCardSelected(null);
  }, [values]);

  return (
    <>
      <CardDeck>
        {values.map((val, i) => {
          return <VoteCard
            key={i}
            handleClick={() => handleCardClick(i, val.value)}
            label={val.label}
            value={val.value}
            selected={isSelected(i)} />
        })}
      </CardDeck>
    </>
  )
}