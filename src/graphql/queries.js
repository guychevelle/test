/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProcess = /* GraphQL */ `
  query GetProcess($id: ID!) {
    getProcess(id: $id) {
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
        admingroups
        readgroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        admingroups
        readgroups
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
