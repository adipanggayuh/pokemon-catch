
import React from 'react';
import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { getBgImage, getImage } from '../../helper/helper';
const PokedexCard = ({ poke, index, onRelease }) => {

    return (

        <Grid item xs={6} key={index}>
            <Card style={{ backgroundImage: `url(${getBgImage(poke)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <CardContent>
                    <Typography component="div" sx={{ flexGrow: 1, }} align='center'>
                        <img src={getImage(poke)} alt="" style={{ maxHeight: 100 }} />
                    </Typography>
                    <div style={{ textAlign: 'center' }}>
                        <Chip style={{ fontSize: 13, }} label={`${poke.nickName} - ${poke.name}`} />
                    </div>
                </CardContent>
                <CardContent sx={{ textAlign: "center" }}>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => onRelease(index)}
                        sx={{ backgroundColor: '#ef5350' }}
                    >
                        Release
                    </Button>
                </CardContent>
            </Card>
        </Grid>

    )
}

export default PokedexCard;