/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProcess = /* GraphQL */ `
  mutation CreateProcess(
    $input: CreateProcessInput!
    $condition: ModelProcessConditionInput
  ) {
    createProcess(input: $input, condition: $condition) {
      id
      name
      description
      admingroups
      readgroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProcess = /* GraphQL */ `
  mutation UpdateProcess(
    $input: UpdateProcessInput!
    $condition: ModelProcessConditionInput
  ) {
    updateProcess(input: $input, condition: $condition) {
      id
      name
      description
      admingroups
      readgroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProcess = /* GraphQL */ `
  mutation DeleteProcess(
    $input: DeleteProcessInput!
    $condition: ModelProcessConditionInput
  ) {
    deleteProcess(input: $input, condition: $condition) {
      id
      name
      description
      admingroups
      readgroups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
