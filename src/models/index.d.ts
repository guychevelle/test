import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProcessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Process {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly admingroups?: (string | null)[] | null;
  readonly readgroups?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Process, ProcessMetaData>);
  static copyOf(source: Process, mutator: (draft: MutableModel<Process, ProcessMetaData>) => MutableModel<Process, ProcessMetaData> | void): Process;
}