import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function OrgUnit({ org }) {
    const { id, name, memberCount, createdAt } = org;

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    <Link to={`/org/${id}`} style={linkStyle}>
                        {name}
                    </Link>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant='body1'>Members: {memberCount}</Typography>
                <Typography variant='body1'>Created On: {createdAt}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default OrgUnit;
