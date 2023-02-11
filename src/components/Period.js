import React from 'react';
import Select from 'react-select';

const Periods = [
  { label: "1時間", value: 1 },
  { label: "2時間", value: 2 },
  { label: "3時間", value: 3 },
  { label: "4時間", value: 4 },
  { label: "5時間", value: 5 },
  { label: "6時間", value: 6 },
  { label: "7時間", value: 7 },
  { label: "8時間", value: 8 },
  { label: "1日", value: 24 },
  { label: "2日", value: 48 },
  { label: "3日", value: 72 },
  { label: "4日", value: 96 },
  { label: "5日", value: 120 },
  { label: "6日", value: 144 },
  { label: "1週間", value: 168 },
  { label: "2週間", value: 336 },
  { label: "3週間", value: 504 },
  { label: "1ヶ月", value: 672 },
];

export default function Period(props) {
  return (
    <div className="container">
      <Select options={Periods} defaultValue={props.period} placeholder="期間" onChange={(value) => { props.setPeriod(value["value"]) }}/>
    </div>
  );
}