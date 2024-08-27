export const idlFactory = ({ IDL }) => {
  const Gem = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'thumbnail' : IDL.Text,
    'description' : IDL.Text,
    'githubUrl' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addGem' : IDL.Func([Gem], [Result], []),
    'getGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'removeGem' : IDL.Func([IDL.Text], [Result], []),
    'updateGem' : IDL.Func([Gem], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
