/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCommand = /* GraphQL */ `
  query GetCommand($id: ID!) {
    getCommand(id: $id) {
      action
      createdAt
      id
      updatedAt
      value
      __typename
    }
  }
`;
export const listCommands = /* GraphQL */ `
  query ListCommands(
    $filter: ModelCommandFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommands(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        action
        createdAt
        id
        updatedAt
        value
        __typename
      }
      nextToken
      __typename
    }
  }
`;
