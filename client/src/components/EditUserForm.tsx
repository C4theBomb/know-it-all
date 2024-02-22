import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Form from "./Form";
import { RecordMp3 } from "../controllers";
import { FormSubmit, FormTextField } from "./StyledElements";

interface EditUserFormProps {
    form: {
        firstName: string;
        lastName: string;
        email: string;
        pronouns: string;
    };
    error: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EditUserForm({
    form,
    error,
    handleSubmit,
    handleChange,
}: EditUserFormProps) {
    const linkStyle = { textDecoration: "none", color: "inherit" };

    return (
        <Form text="Update Account Details">
            <form onSubmit={handleSubmit}>
                <FormTextField
                    required
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={form.firstName}
                />
                <FormTextField
                    required
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={form.lastName}
                />
                <FormTextField
                    required
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                />
                <FormTextField
                    required
                    label="Pronouns"
                    name="pronouns"
                    onChange={handleChange}
                    value={form.pronouns}
                />
                {error && (
                    <Box textAlign="right">
                        <Typography variant="body2" color="secondary">
                            {error}
                        </Typography>
                    </Box>
                )}
                <FormSubmit color="primary" type="submit">
                    Update Details
                </FormSubmit>
                <FormSubmit color="error" type="button">
                    <Link to="/recover" style={linkStyle}>
                        Reset Your Password
                    </Link>
                </FormSubmit>
            </form>
            <RecordMp3 />
        </Form>
    );
}

export default EditUserForm;
