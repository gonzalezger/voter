'use strict';

function buildRangeValues({ rangeFrom, rangeTo }) {
  const values = [];

  for (let i = rangeFrom; i <= rangeTo; i++) {
    values.push({ label: '', value: i });
  }

  return values;
}

function buildFibonacciValues() {
  const fiboValues = [1, 2, 3, 5, 8, 13];
  return fiboValues.map((m) => ({ label: '', value: m }));
}

module.exports = (voteType) => {
  const { type, args } = voteType;

  switch (type) {
    case 'YesNo':
      return [
        { label: '', value: 'Yes' },
        { label: '', value: 'No' }
      ];
    case 'Range':
      return buildRangeValues(args);
    case 'Fibonacci':
      return buildFibonacciValues();
    default:
      break;
  }
};
