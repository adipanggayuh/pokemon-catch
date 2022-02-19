import React from 'react';
import { Grid, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
const NavigationList = ({ onNextData, onPrevData }) => {
    return (

        <Grid item xs={12} textAlign={'right'}>
            <IconButton onClick={onPrevData} title="prev">
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={onNextData} title="next">
                <NavigateNextIcon />
            </IconButton>
        </Grid>

    )
}

export default NavigationList;