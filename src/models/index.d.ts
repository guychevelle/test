import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProcessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StepsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CodeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Process {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly picturekey?: string | null;
  readonly steps?: (Steps | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Process, ProcessMetaData>);
  static copyOf(source: Process, mutator: (draft: MutableModel<Process, ProcessMetaData>) => MutableModel<Process, ProcessMetaData> | void): Process;
}

export declare class Steps {
  readonly id: string;
  readonly stepnum: number;
  readonly name: string;
  readonly description?: string | null;
  readonly steptextkey?: string | null;
  readonly code?: Code | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly processStepsId?: string | null;
  readonly stepsCodeId?: string | null;
  constructor(init: ModelInit<Steps, StepsMetaData>);
  static copyOf(source: Steps, mutator: (draft: MutableModel<Steps, StepsMetaData>) => MutableModel<Steps, StepsMetaData> | void): Steps;
}

export declare class Code {
  readonly id: string;
  readonly codetextkey?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Code, CodeMetaData>);
  static copyOf(source: Code, mutator: (draft: MutableModel<Code, CodeMetaData>) => MutableModel<Code, CodeMetaData> | void): Code;
}