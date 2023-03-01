import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const Categories = [
  { label: "指定無し", value: "" },
  { label: "ペット", value: "ペット" },
  { label: "ワーク", value: "ワーク" },
  { label: "生活", value: "生活" },
  { label: "学習", value: "学習" },
];

interface CategoryListProps {
  category: string;
  setCategory: (value: string) => void;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const CategoryList: React.FC<CategoryListProps> = ({ category, setCategory }) => {
  return (
    <Container>
      <Select
        options={Categories}
        defaultValue={Categories.find((c) => c.value === category)}
        placeholder="カテゴリー"
        onChange={(value) => {
          setCategory(value?.value ?? '');
        }}
      />
    </Container>
  );
};

export default CategoryList;