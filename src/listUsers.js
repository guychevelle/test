
/*  my additions to enable retrieval of current user crednetials
*/
import { Auth } from 'aws-amplify';

/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

/* 
start code from https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/libs/utils/util-aws-sdk.js
*/

import { curry, defaultTo } from "ramda";

const DEFAULT_REGION = 'us-east-1';
const orDefaultRegion = defaultTo(DEFAULT_REGION);

const createClientForRegion = curry (
  (region, ClientConstructor) => 
    new ClientConstructor({ region: orDefaultRegion(region) })
);

const createClientForDefaultRegion = createClientForRegion(null);

/*
end of util-aws-sdk.js code
*/

/*
start of https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/cognito/actions/list-users.js
*/

const listUsers = async (event) => {
  console.log('process.env', process.env);
  const user = await Auth.currentAuthenticatedUser();
  const sess = await Auth.currentSession();
  const creds = await Auth.currentCredentials();

  console.log('current auth user', user);
  console.log('current sess' , sess);
  console.log('current creds', creds);
  console.log('Access Key Id', creds.accessKeyId);
  console.log('Secret Access Key', creds.secretAccessKey);

  const usercreds = {
    accessKeyId: creds.accessKeyId,
    secretAccessKey: creds.secretAccessKey
  };

  //const client = createClientForDefaultRegion(CognitoIdentityProviderClient);

  const client = new CognitoIdentityProviderClient({
    region: 'us-east-1',
    credentials: usercreds
  });

  // for the app, find the user pool id in the Cognito console
  const input = {
    UserPoolId: "us-east-1_wOVNZywK2"
  };

  const command = new ListUsersCommand(input);

  const response = await client.send(command)
                   .then((response) => console.log('send response', response))
                   .catch((error) => console.log('send error', error));
  console.log(response);
}

export { listUsers };

