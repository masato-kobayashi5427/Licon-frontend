import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../App.js'

export default function Limit(props) {

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      className="date-picker"
      selected={props.limit}
      placeholderText="期限を決めてください"
      onChange={event => props.setLimit(event)}
    />
  )
}