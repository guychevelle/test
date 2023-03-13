// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Process } = initSchema(schema);

export {
  Process
};