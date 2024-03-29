import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import OrgUnit from "./OrgUnit";

import { Organization } from "../types";

interface OrganizationListProps {
    orgs: Organization[];
}

export default function OrganizationList({ orgs }: OrganizationListProps) {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                ...theme.typography.body2,
                padding: "2vh",
                color: theme.palette.text.secondary,
                flexGrow: 1,
                height: "89vh",
                margin: "2vh",
            }}
        >
            <Typography variant="h6">Organizations</Typography>
            <hr />
            <Box sx={{ overflowY: "auto" }}>
                {orgs.map((org) => (
                    <OrgUnit org={org} key={org.id} />
                ))}
            </Box>
        </Paper>
    );
}
