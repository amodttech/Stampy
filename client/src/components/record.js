import React from 'react'
import { Link } from "react-router-dom";

function Record(props) {


  return (
    <tr>
    <td>{props.record.name}</td>
    <td>{props.record.date}</td>
    <td>{props.record.country}</td>
    <td>{props.record.subject}</td>
    <td>
      <Link to={`/edit/${props.record._id}`}>Edit</Link> |
      <button
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
  )
}

export default Record