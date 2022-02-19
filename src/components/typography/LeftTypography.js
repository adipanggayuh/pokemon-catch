import React from 'react';
import { Typography } from '@mui/material';

const LeftTypography = (props) => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', } }}
        >
            {props.children}
        </Typography>
    )
}
export default LeftTypography;