import React from 'react';
import PropTypes from 'prop-types';

const NoticeTableRow = ({ children }) => {
  NoticeTableRow.propTypes = {

    children: PropTypes.elementType.isRequired,
  };
  return (
    <tr className="tableRow_NT">
      {
        children
      }
    </tr>
  )
}

export default NoticeTableRow;