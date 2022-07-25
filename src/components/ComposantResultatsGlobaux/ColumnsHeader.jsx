import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import { Typography } from '@mui/material';

const ColumnsHeader = ({ field }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        variant="subtitle2"
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {field}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ backgroundColor: '#1f1f1f1f', color: '#121212' }} variant="h10">
          {field}
        </Typography>
      </Popover>
    </div>
  );
};

ColumnsHeader.propTypes = {
  field: PropTypes.string.isRequired,
};
export default ColumnsHeader;
