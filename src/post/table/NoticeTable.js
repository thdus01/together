import React from 'react';
import '../page/css/NoticeTable.css';
import PropTypes from 'prop-types';
const NoticeTable = props => {
  const { headersName, children } = props;
  NoticeTable.propTypes = {

    children: PropTypes.elementType.isRequired,
    headersName: PropTypes.elementType.isRequired,
    
    };
  return (
    <table className="noticeTable_NT">
      <thead>
        <tr>
          {
            headersName.map((item, index) => {
              return (
                <td className="headerColumn_NT" key={index}> { item } </td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>
    </table>
  )
}

export default NoticeTable;