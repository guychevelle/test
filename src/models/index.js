// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Process, Steps, Code } = initSchema(schema);

export {
  Process,
  Steps,
  Code
};