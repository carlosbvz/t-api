"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextField,
  SelectField,
} from "@aws-amplify/ui-react";
import {
  fetchByPath,
  getOverrideProps,
  validateField,
} from "@/ui-components/utils";
import { generateClient } from "aws-amplify/api";
import { createCommand } from "@/ui-components/graphql/mutations";
const client = generateClient();
export default function CommandCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    source: "SENSOR1",
    action: "FORWARD",
    value: "",
  };
  const [source, setSource] = React.useState(initialValues.source);
  const [action, setAction] = React.useState(initialValues.action);
  const [value, setValue] = React.useState(initialValues.value);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSource(initialValues.source);
    setAction(initialValues.action);
    setValue(initialValues.value);
    setErrors({});
  };
  const validations = {
    source: [],
    action: [],
    value: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          source,
          action,
          value,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createCommand.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CommandCreateForm")}
      {...rest}
    >
      <SelectField
        label="Source"
        value={source}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              source: value,
              action,
              value,
            };
            const result = onChange(modelFields);
            value = result?.source ?? value;
          }
          if (errors.source?.hasError) {
            runValidationTasks("source", value);
          }
          setSource(value);
        }}
        onBlur={() => runValidationTasks("source", source)}
        errorMessage={errors.source?.errorMessage}
        hasError={errors.source?.hasError}
        {...getOverrideProps(overrides, "source")}
      >
        <option value="SENSOR1">Sensor 1</option>
        <option value="SENSOR2">Sensor 2</option>
        <option value="SENSOR3">Sensor 3</option>
      </SelectField>

      <SelectField
       label="Action"
        isRequired={false}
        value={action}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              source,
              action: value,
              value,
            };
            const result = onChange(modelFields);
            value = result?.action ?? value;
          }
          if (errors.action?.hasError) {
            runValidationTasks("action", value);
          }
          setAction(value);
        }}
        onBlur={() => runValidationTasks("action", action)}
        errorMessage={errors.action?.errorMessage}
        hasError={errors.action?.hasError}
      >
        <option value="FORWARD">Forward</option>
        <option value="BACKWARD">Backward</option>
        <option value="TURN_RIGHT">Turn Right</option>
        <option value="TURN_LEFT">Turn Left</option>
      </SelectField>

      {/* <TextField
        label="Action"
        isRequired={false}
        isReadOnly={false}
        value={action}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              source,
              action: value,
              value,
            };
            const result = onChange(modelFields);
            value = result?.action ?? value;
          }
          if (errors.action?.hasError) {
            runValidationTasks("action", value);
          }
          setAction(value);
        }}
        onBlur={() => runValidationTasks("action", action)}
        errorMessage={errors.action?.errorMessage}
        hasError={errors.action?.hasError}
        {...getOverrideProps(overrides, "action")}
      ></TextField> */}
      <TextField
        label="Value"
        isRequired={false}
        type="number"
        step="any"
        value={value}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              source,
              action,
              value: value,
            };
            const result = onChange(modelFields);
            value = result?.value ?? value;
          }
          if (errors.value?.hasError) {
            runValidationTasks("value", value);
          }
          setValue(value);
        }}
        onBlur={() => runValidationTasks("value", value)}
        errorMessage={errors.value?.errorMessage}
        hasError={errors.value?.hasError}
        {...getOverrideProps(overrides, "value")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
