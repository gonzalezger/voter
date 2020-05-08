"use strict";

import React from 'react';
import { FcApprove, FcDecision } from "react-icons/fc";

function buildRangeValues({ rangeFrom, rangeTo }) {
  const values = [];

  for (let i = rangeFrom; i <= rangeTo; i++) {
    values.push({ value: i });
  }

  return values;
}

function buildAdminWaitList(users) {
  const values = [];

  users.forEach(user => {
    values.push({ label: user, value: <FcDecision />});
  });

  return values;
}

export default function (voteType) {
  switch (voteType.type) {
    case "YesNo":
      return [{ value: "Yes" }, { value: "No" }];
    case "Range":
      return buildRangeValues(voteType.args);
    case "AdminWaitList":
      return buildAdminWaitList(voteType.args.users);
    default:
      break;
  }
}
