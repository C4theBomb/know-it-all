import Form from "./Form";
import { FormSubmit, FormTextField } from "./StyledElements";

interface RecoverFormProps {
    form: {
        email: string;
    };
    error: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RecoverForm({
    form,
    error,
    handleSubmit,
    handleChange,
}: RecoverFormProps) {
    return (
        <Form text="Recover Password" error={error}>
            <form onSubmit={handleSubmit}>
                <FormTextField
                    required
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                />
                <FormSubmit color="primary" type="submit">
                    Recover my password
                </FormSubmit>
            </form>
        </Form>
    );
}

export default RecoverForm;
