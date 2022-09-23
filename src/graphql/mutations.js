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
      picturekey
      steps {
        items {
          id
          stepnum
          name
          description
          steptextkey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          processStepsId
          stepsCodeId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
      picturekey
      steps {
        items {
          id
          stepnum
          name
          description
          steptextkey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          processStepsId
          stepsCodeId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
      picturekey
      steps {
        items {
          id
          stepnum
          name
          description
          steptextkey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          processStepsId
          stepsCodeId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createSteps = /* GraphQL */ `
  mutation CreateSteps(
    $input: CreateStepsInput!
    $condition: ModelStepsConditionInput
  ) {
    createSteps(input: $input, condition: $condition) {
      id
      stepnum
      name
      description
      steptextkey
      code {
        id
        codetextkey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      processStepsId
      stepsCodeId
      owner
    }
  }
`;
export const updateSteps = /* GraphQL */ `
  mutation UpdateSteps(
    $input: UpdateStepsInput!
    $condition: ModelStepsConditionInput
  ) {
    updateSteps(input: $input, condition: $condition) {
      id
      stepnum
      name
      description
      steptextkey
      code {
        id
        codetextkey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      processStepsId
      stepsCodeId
      owner
    }
  }
`;
export const deleteSteps = /* GraphQL */ `
  mutation DeleteSteps(
    $input: DeleteStepsInput!
    $condition: ModelStepsConditionInput
  ) {
    deleteSteps(input: $input, condition: $condition) {
      id
      stepnum
      name
      description
      steptextkey
      code {
        id
        codetextkey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      processStepsId
      stepsCodeId
      owner
    }
  }
`;
export const createCode = /* GraphQL */ `
  mutation CreateCode(
    $input: CreateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    createCode(input: $input, condition: $condition) {
      id
      codetextkey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateCode = /* GraphQL */ `
  mutation UpdateCode(
    $input: UpdateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    updateCode(input: $input, condition: $condition) {
      id
      codetextkey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteCode = /* GraphQL */ `
  mutation DeleteCode(
    $input: DeleteCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    deleteCode(input: $input, condition: $condition) {
      id
      codetextkey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
