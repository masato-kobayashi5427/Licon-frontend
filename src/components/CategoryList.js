import React from 'react';
import Select from 'react-select';

const Categories = [
  { label: "指定無し", value: "" },
  { label: "ペット", value: "ペット" },
  { label: "ワーク", value: "ワーク" },
  { label: "生活", value: "生活" },
  { label: "学習", value: "学習" },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 },
];

export default function CategoryList(props) {

  return (
    <div className="container">
      <Select options={Categories} defaultValue={props.category} placeholder="カテゴリー" onChange={(value) => { props.setCategory(value["value"]) }}/>
    </div>
  );
}