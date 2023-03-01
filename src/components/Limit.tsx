import React, { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

interface LimitProps {
  limit?: Date,
  setLimit: Dispatch<SetStateAction<Date | undefined>>
}

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  box-shadow: none;
  margin-bottom: 1rem;
`;

const Limit: React.FC<LimitProps> = ({ limit, setLimit }) => {
  return (
    <StyledDatePicker
      dateFormat="yyyy-MM-dd"
      selected={limit}
      placeholderText="期限を決めてください"
      onChange={(date: Date | null) => setLimit(date || undefined)}
      minDate={new Date()}
    />
  );
};

export default Limit;