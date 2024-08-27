import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Gem {
  'id' : string,
  'title' : string,
  'featured' : boolean,
  'thumbnail' : string,
  'createdAt' : bigint,
  'githubUrl' : string,
  'author' : { 'name' : string, 'avatar' : string },
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'addGem' : ActorMethod<[Gem], Result>,
  'getFeaturedGems' : ActorMethod<[], Array<Gem>>,
  'getGems' : ActorMethod<[], Array<Gem>>,
  'getLatestGems' : ActorMethod<[], Array<Gem>>,
  'updateGem' : ActorMethod<[Gem], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
