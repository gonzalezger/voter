import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';

import { IconContext } from "react-icons";

export default function VoteCard({ label, value, selected, handleClick }) {
  return (
    <>
      <Card
        body
        className="text-center vote-card w-200 h-200 justify-content-center"
        bg={selected ? 'primary' : 'default'}
        text={selected ? 'white' : 'dark'}
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <IconContext.Provider value={{ size: '2em' }}>
          <div>
            {label && <p>{label}</p>}
            {value}
          </div>
        </IconContext.Provider>
      </Card>
    </>
  )
}