import {
    Alert, Box, Card, CardContent, Grid, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

interface FormProps {
    children: React.ReactNode;
    text?: string;
    error?: string;
}

function Form({ children, text, error }: FormProps) {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ height: "95vh" }}
            >
                <Grid item xs={0.5} sm={2} md={4} />
                <Grid item xs={11} sm={8} md={4}>
                    <Card
                        sx={{
                            ...theme.typography.body2,
                            padding: "2vh",
                            textAlign: "center",
                            color: theme.palette.text.secondary,
                        }}
                    >
                        <CardContent>
                            {text && (
                                <Typography
                                    variant="h5"
                                    sx={{
                                        margin: "1vh 0vh",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {text}
                                </Typography>
                            )}
                            {children}
                            <Outlet />
                            {error && <Alert severity="error">{error}</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={0.5} sm={2} md={4} />
            </Grid>
        </Box>
    );
}

export default Form;
