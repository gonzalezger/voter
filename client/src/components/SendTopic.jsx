import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function SendTopic({ onSend }) {
  const [topic, setTopic] = useState('');
  const [voteType, setVoteType] = useState('YesNo');
  const [rangeFrom, setRangeFrom] = useState();
  const [rangeTo, setRangeTo] = useState();
  const [adminCanVote, setAdminCanVote] = useState(false);

  const handleSelectVoteType = e => {
    setVoteType(e);
  }

  const sendTopic = (e) => {
    e.preventDefault();

    if (!topic) {
      alert("Topic can't be empty");
      return;
    }

    if (voteType === 'Range') {
      if (rangeFrom === undefined || rangeFrom < 0) {
        alert("Invalid range from");
        return;
      }

      if (rangeTo === undefined || rangeTo <= rangeFrom) {
        alert("Invalid range to");
        return;
      }
    }

    onSend(topic, adminCanVote, { type: voteType, args: { rangeFrom, rangeTo } });
  }

  return (
    <>
      <input onChange={e => setTopic(e.target.value.trim())} placeholder="Topic to vote" />
      <Form.Control
        as="select"
        onChange={e => handleSelectVoteType(e.target.value.trim())}
      >
        <option>YesNo</option>
        <option>Range</option>
        <option>Fibonacci</option>
      </Form.Control>
      {voteType && voteType === 'Range' && (
        <>
          <input onChange={e => setRangeFrom(+e.target.value.trim())} type="number" min="0" required placeholder="from" />
          <input onChange={e => setRangeTo(+e.target.value.trim())} type="number" min="1" required placeholder="to" />
        </>
      )}
      <br />
      <Form.Check
        onChange={e => setAdminCanVote(e.target.checked)}
        type="switch"
        id="custom-switch"
        label="Admin can vote"
      />
      <br />
      <button onClick={e => sendTopic(e)}>Emit</button>
    </>
  )
}