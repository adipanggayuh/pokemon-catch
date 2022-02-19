import React, { useState } from 'react';
import {
    Grid, Box,
    Tabs,
    Tab, Chip
} from '@mui/material';
import TabPanel from './tabPanel';
import { extractValue } from '../../helper/helper';

const allProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PokeTabs = ({ pokeInfo, moves }) => {
    // ======== variable and state =======
    const [tabVal, setTabVal] = useState(0);

    const handleChange = (event, newValue) => {
        setTabVal(newValue);
    };
    const getTypes = (poke) => {
        let types = poke.types ? extractValue(poke.types, 'type') : [];
        return types.join();
    }

    const getAbilities = (poke) => {
        let abilities = poke.abilities ? extractValue(poke.abilities, 'ability') : [];
        return abilities.join();
    }

    return (

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabVal} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="About" {...allProps(0)} />
                    <Tab label="Moves" {...allProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabVal} index={0}>
                <Grid container>
                    <Grid item xs={3}>
                        Types
                    </Grid>
                    <Grid item xs={9}>
                        : {getTypes(pokeInfo)}
                    </Grid>
                    <Grid item xs={3}>
                        Height
                    </Grid>
                    <Grid item xs={9}>
                        : {pokeInfo.height}
                    </Grid>
                    <Grid item xs={3}>
                        Wight
                    </Grid>
                    <Grid item xs={9}>
                        : {pokeInfo.weight}
                    </Grid>
                    <Grid item xs={3}>
                        Abilities
                    </Grid>
                    <Grid item xs={9}>
                        : {getAbilities(pokeInfo)}
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
                {moves.length > 0 && moves.map(move => {
                    return <Chip key={move} label={move} />
                })}
            </TabPanel>
        </Box>
    )
}

export default PokeTabs;