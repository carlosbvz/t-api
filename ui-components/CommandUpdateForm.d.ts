import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Command } from "./graphql/types";
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
export declare type CommandUpdateFormInputValues = {
    action?: string;
    value?: number;
};
export declare type CommandUpdateFormValidationValues = {
    action?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommandUpdateFormOverridesProps = {
    CommandUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    action?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommandUpdateFormProps = React.PropsWithChildren<{
    overrides?: CommandUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    command?: Command;
    onSubmit?: (fields: CommandUpdateFormInputValues) => CommandUpdateFormInputValues;
    onSuccess?: (fields: CommandUpdateFormInputValues) => void;
    onError?: (fields: CommandUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommandUpdateFormInputValues) => CommandUpdateFormInputValues;
    onValidate?: CommandUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CommandUpdateForm(props: CommandUpdateFormProps): React.ReactElement;
