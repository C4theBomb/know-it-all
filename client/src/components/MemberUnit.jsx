import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function MemberUnit({ member, onClick }) {
    const { id, firstName, lastName, nickname, pronouns, email } = member;

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    {firstName} {lastName} ({nickname}): {pronouns}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid item textAlign='left' xs={11} sm={11}>
                        <Typography variant='body1'>ID: {id}</Typography>
                        <Typography variant='body1'>Email: {email}</Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} justifyContent='flex-end'>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                            onClick={() => onClick(member.id)}
                        >
                            <PlayArrowIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default MemberUnit;
