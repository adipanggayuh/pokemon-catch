
import React from 'react';
import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { getBgImage, getImage } from '../../helper/helper';
const PokedexCard = ({ poke, index, onRelease }) => {

    return (

        <Grid item xs={6} key={index}>
            <Card style={{ backgroundImage: `url(${getBgImage(poke)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <CardContent>
                    <Typography >
                        <Typography item xs={6}>
                            <img src={getImage(poke)} alt="" height={100} />
                        </Typography>
                        <Typography item xs={6}>
                            <Chip sx={{ fontSize: '20px' }} label={poke.nickName} />

                            <Chip label={poke.name} />

                        </Typography>
                    </Typography>



                </CardContent>
                <CardContent sx={{ textAlign: "right" }}>
                    <Button variant="contained" size="medium" onClick={() => onRelease(index)} sx={{ backgroundColor: '#ef5350' }}>Release</Button>
                </CardContent>
            </Card>
        </Grid>

    )
}

export default PokedexCard;