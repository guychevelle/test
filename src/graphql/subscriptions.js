/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProcess = /* GraphQL */ `
  subscription OnCreateProcess($owner: String) {
    onCreateProcess(owner: $owner) {
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
export const onUpdateProcess = /* GraphQL */ `
  subscription OnUpdateProcess($owner: String) {
    onUpdateProcess(owner: $owner) {
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
export const onDeleteProcess = /* GraphQL */ `
  subscription OnDeleteProcess($owner: String) {
    onDeleteProcess(owner: $owner) {
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
export const onCreateSteps = /* GraphQL */ `
  subscription OnCreateSteps($owner: String) {
    onCreateSteps(owner: $owner) {
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
export const onUpdateSteps = /* GraphQL */ `
  subscription OnUpdateSteps($owner: String) {
    onUpdateSteps(owner: $owner) {
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
export const onDeleteSteps = /* GraphQL */ `
  subscription OnDeleteSteps($owner: String) {
    onDeleteSteps(owner: $owner) {
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
export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode($owner: String) {
    onCreateCode(owner: $owner) {
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
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode($owner: String) {
    onUpdateCode(owner: $owner) {
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
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode($owner: String) {
    onDeleteCode(owner: $owner) {
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
