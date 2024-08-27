import Char "mo:base/Char";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";

actor {
  type Gem = {
    id: Text;
    title: Text;
    thumbnail: Text;
    githubUrl: Text;
    author: {
      name: Text;
      avatar: Text;
    };
  };

  private stable var gemsEntries : [(Text, Gem)] = [
    ("1", { id = "1"; title = "Awesome Project"; thumbnail = "https://fakeimg.pl/600x400?text=Awesome"; githubUrl = "https://github.com/awesome/project"; author = { name = "Alice Johnson"; avatar = "https://i.pravatar.cc/150?u=alice" } }),
    ("2", { id = "2"; title = "Cool Library"; thumbnail = "https://fakeimg.pl/600x400?text=Cool"; githubUrl = "https://github.com/cool/library"; author = { name = "Bob Smith"; avatar = "https://i.pravatar.cc/150?u=bob" } }),
    ("3", { id = "3"; title = "Useful Tool"; thumbnail = "https://fakeimg.pl/600x400?text=Useful"; githubUrl = "https://github.com/useful/tool"; author = { name = "Charlie Brown"; avatar = "https://i.pravatar.cc/150?u=charlie" } }),
    ("4", { id = "4"; title = "Great Framework"; thumbnail = "https://fakeimg.pl/600x400?text=Great"; githubUrl = "https://github.com/great/framework"; author = { name = "Diana Prince"; avatar = "https://i.pravatar.cc/150?u=diana" } }),
    ("5", { id = "5"; title = "Amazing API"; thumbnail = "https://fakeimg.pl/600x400?text=Amazing"; githubUrl = "https://github.com/amazing/api"; author = { name = "Ethan Hunt"; avatar = "https://i.pravatar.cc/150?u=ethan" } }),
    ("6", { id = "6"; title = "Fantastic SDK"; thumbnail = "https://fakeimg.pl/600x400?text=Fantastic"; githubUrl = "https://github.com/fantastic/sdk"; author = { name = "Fiona Gallagher"; avatar = "https://i.pravatar.cc/150?u=fiona" } })
  ];
  private var gems = HashMap.HashMap<Text, Gem>(10, Text.equal, Text.hash);

  public func addGem(gem: Gem) : async Result.Result<(), Text> {
    if (gems.get(gem.id) != null) {
      return #err("Gem with this ID already exists");
    };
    gems.put(gem.id, gem);
    #ok(())
  };

  public query func getGems() : async [Gem] {
    Iter.toArray(gems.vals())
  };

  public func updateGem(gem: Gem) : async Result.Result<(), Text> {
    switch (gems.replace(gem.id, gem)) {
      case null { #err("Gem not found") };
      case (?_) { #ok(()) };
    }
  };

  system func preupgrade() {
    gemsEntries := Iter.toArray(gems.entries());
  };

  system func postupgrade() {
    gems := HashMap.fromIter<Text, Gem>(gemsEntries.vals(), 10, Text.equal, Text.hash);
  };
}
