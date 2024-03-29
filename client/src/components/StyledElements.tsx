import {
    Button,
    FormGroup,
    Paper,
    Stack,
    TextField,
    TextFieldProps,
    ButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Form = styled(FormGroup)(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
        column: true,
    },
}));
const FormField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
        column: true,
        width: "75%",
    },
}));
const FormButton = styled(Button)(({ theme }) => ({
    disableElevation: true,
    color: theme.palette.primary.main,
    [theme.breakpoints.only("xs")]: {
        column: true,
        width: "25%",
    },
}));

const DynamicStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        spacing: 2,
        alignItems: "flex-end",
    },
}));

const DynamicPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "2vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexGrow: 1,
    margin: "0 2vh",
    [theme.breakpoints.only("xs")]: {
        height: "80vh",
    },
    [theme.breakpoints.only("sm")]: {
        height: "80vh",
    },
    [theme.breakpoints.only("md")]: {
        height: "82vh",
    },
}));

interface FormTextFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    other?: TextFieldProps;
}

function FormTextField({
    label,
    name,
    value,
    onChange,
    required,
    other,
}: FormTextFieldProps) {
    return (
        <TextField
            required={required}
            fullWidth
            label={label}
            name={name}
            variant="outlined"
            onChange={onChange}
            value={value}
            sx={{ margin: "1vh 0vh" }}
            {...other}
        />
    );
}

interface FormSubmitProps {
    color: "primary" | "secondary" | "error";
    children: React.ReactNode;
    type: "button" | "submit";
    other?: ButtonProps;
}

function FormSubmit({ color, children, type, other }: FormSubmitProps) {
    return (
        <Button
            variant="contained"
            color={color}
            sx={{ margin: "1vh 0vh" }}
            type={type}
            fullWidth
            {...other}
        >
            {children}
        </Button>
    );
}

export {
    DynamicPaper,
    DynamicStack,
    Form,
    FormButton,
    FormField,
    FormSubmit,
    FormTextField,
};
