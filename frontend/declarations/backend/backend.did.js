export const idlFactory = ({ IDL }) => {
  const Gem = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'thumbnail' : IDL.Text,
    'githubUrl' : IDL.Text,
    'author' : IDL.Record({ 'name' : IDL.Text, 'avatar' : IDL.Text }),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addGem' : IDL.Func([Gem], [Result], []),
    'getGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'updateGem' : IDL.Func([Gem], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
