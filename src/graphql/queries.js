/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProcess = /* GraphQL */ `
  query GetProcess($id: ID!) {
    getProcess(id: $id) {
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
export const listProcesses = /* GraphQL */ `
  query ListProcesses(
    $filter: ModelProcessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProcesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        picturekey
        steps {
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
      nextToken
      startedAt
    }
  }
`;
export const syncProcesses = /* GraphQL */ `
  query SyncProcesses(
    $filter: ModelProcessFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProcesses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        picturekey
        steps {
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
      nextToken
      startedAt
    }
  }
`;
export const getSteps = /* GraphQL */ `
  query GetSteps($id: ID!) {
    getSteps(id: $id) {
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
export const listSteps = /* GraphQL */ `
  query ListSteps(
    $filter: ModelStepsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSteps = /* GraphQL */ `
  query SyncSteps(
    $filter: ModelStepsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSteps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
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
export const listCodes = /* GraphQL */ `
  query ListCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        codetextkey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCodes = /* GraphQL */ `
  query SyncCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        codetextkey
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
