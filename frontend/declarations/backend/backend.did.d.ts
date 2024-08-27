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
  'category' : string,
}
export interface _SERVICE {
  'getFeaturedGems' : ActorMethod<[], Array<Gem>>,
  'getGems' : ActorMethod<[], Array<Gem>>,
  'getGemsByCategory' : ActorMethod<[string], Array<Gem>>,
  'getLatestGems' : ActorMethod<[], Array<Gem>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
