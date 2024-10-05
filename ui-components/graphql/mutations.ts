/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCommand = /* GraphQL */ `
  mutation CreateCommand(
    $condition: ModelCommandConditionInput
    $input: CreateCommandInput!
  ) {
    createCommand(condition: $condition, input: $input) {
      action
      createdAt
      id
      updatedAt
      value
      __typename
    }
  }
`;
export const deleteCommand = /* GraphQL */ `
  mutation DeleteCommand(
    $condition: ModelCommandConditionInput
    $input: DeleteCommandInput!
  ) {
    deleteCommand(condition: $condition, input: $input) {
      action
      createdAt
      id
      updatedAt
      value
      __typename
    }
  }
`;
export const updateCommand = /* GraphQL */ `
  mutation UpdateCommand(
    $condition: ModelCommandConditionInput
    $input: UpdateCommandInput!
  ) {
    updateCommand(condition: $condition, input: $input) {
      action
      createdAt
      id
      updatedAt
      value
      __typename
    }
  }
`;
