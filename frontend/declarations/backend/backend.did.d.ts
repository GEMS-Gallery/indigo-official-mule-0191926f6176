import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Gem {
  'id' : string,
  'title' : string,
  'thumbnail' : string,
  'githubUrl' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'addGem' : ActorMethod<[Gem], Result>,
  'getGems' : ActorMethod<[], Array<Gem>>,
  'removeGem' : ActorMethod<[string], Result>,
  'updateGem' : ActorMethod<[Gem], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
