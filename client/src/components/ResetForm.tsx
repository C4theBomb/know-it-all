import Form from "./Form";
import { FormSubmit, FormTextField } from "./StyledElements";

interface ResetFormProps {
    form: {
        password: string;
        confirmPassword: string;
    };
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function ResetForm({
    form,
    handleSubmit,
    handleChange,
    error,
}: ResetFormProps) {
    return (
        <Form text="Reset Password" error={error}>
            <form onSubmit={handleSubmit}>
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
                    Reset my Password
                </FormSubmit>
            </form>
        </Form>
    );
}

export default ResetForm;
