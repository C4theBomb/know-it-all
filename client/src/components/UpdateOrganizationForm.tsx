import Form from "./Form";
import { FormSubmit, FormTextField } from "./StyledElements";

interface UpdateOrganizationFormProps {
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UpdateOrganizationForm({
    name,
    handleSubmit,
    handleChange,
}: UpdateOrganizationFormProps) {
    return (
        <Form text="Rename Organization">
            <form onSubmit={handleSubmit}>
                <FormTextField
                    required
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={name}
                />
                <FormSubmit color="primary" type="submit">
                    Rename
                </FormSubmit>
            </form>
        </Form>
    );
}
