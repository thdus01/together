import React from 'react';
import PropTypes from 'prop-types';

const NoticeTableColumn = ({ children }) => {
  NoticeTableColumn.propTypes = {

    children: PropTypes.elementType.isRequired,
  };
  return (
    <td className="tableColumn_NT">
      {
        children
      }
    </td>
  )
}

export default NoticeTableColumn;