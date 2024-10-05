import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CommandCreateFormInputValues = {
    action?: string;
    value?: number;
};
export declare type CommandCreateFormValidationValues = {
    action?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommandCreateFormOverridesProps = {
    CommandCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    action?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommandCreateFormProps = React.PropsWithChildren<{
    overrides?: CommandCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CommandCreateFormInputValues) => CommandCreateFormInputValues;
    onSuccess?: (fields: CommandCreateFormInputValues) => void;
    onError?: (fields: CommandCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommandCreateFormInputValues) => CommandCreateFormInputValues;
    onValidate?: CommandCreateFormValidationValues;
} & React.CSSProperties>;
export default function CommandCreateForm(props: CommandCreateFormProps): React.ReactElement;
