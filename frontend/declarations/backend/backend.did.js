export const idlFactory = ({ IDL }) => {
  const Gem = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'thumbnail' : IDL.Text,
    'createdAt' : IDL.Int,
    'githubUrl' : IDL.Text,
    'author' : IDL.Record({ 'name' : IDL.Text, 'avatar' : IDL.Text }),
    'category' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addGem' : IDL.Func([Gem], [Result], []),
    'getFeaturedGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'getGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'getGemsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Gem)], ['query']),
    'getLatestGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'updateGem' : IDL.Func([Gem], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
