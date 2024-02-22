import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Form from "./Form";
import { FormSubmit, FormTextField } from "./StyledElements";

interface RegisterFormProps {
    form: {
        firstName: string;
        lastName: string;
        email: string;
        pronouns: string;
        password: string;
        confirmPassword: string;
    };
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

function RegisterForm({
    form,
    handleSubmit,
    handleChange,
    error,
}: RegisterFormProps) {
    return (
        <Form text="Create an Account" error={error}>
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
                    label="Pronouns"
                    name="pronouns"
                    onChange={handleChange}
                    value={form.pronouns}
                />
                <FormTextField
                    required
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    other={{ type: "password" }}
                />
                <FormTextField
                    required
                    label="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={form.confirmPassword}
                    other={{ type: "password" }}
                />
                <FormSubmit
                    color="primary"
                    type="submit"
                    other={{ disabled: form.password !== form.confirmPassword }}
                >
                    Create an Account
                </FormSubmit>
                <Typography variant="body1">
                    Already have an account?
                    {" "}
                    <Link to="/login">Login</Link>
                </Typography>
            </form>
        </Form>
    );
}

export default RegisterForm;
