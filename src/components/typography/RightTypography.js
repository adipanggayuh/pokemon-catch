import React from 'react';
import { Typography } from '@mui/material';

const RightTypography = (props) => {
    return (
        <Typography component={'div'} sx={{ flexGrow: 1, }} align='right'>
            {props.children}
        </Typography>
    )

}
export default RightTypography;