import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Table = ({ tablehead, tablerows }) => (
  <Card className="h-full w-full overflow-scroll rounded-none">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {tablehead.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tablerows.map((item) => (
          <tr key={item.name} className="even:bg-blue-gray-50/50">
            <td className="p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.name}
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);
export default Table;

Table.propTypes = {
  tablehead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tablerows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
