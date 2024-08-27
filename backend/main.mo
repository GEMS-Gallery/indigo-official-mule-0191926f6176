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
  };

  private stable var gemsEntries : [(Text, Gem)] = [];
  private var gems = HashMap.HashMap<Text, Gem>(10, Text.equal, Text.hash);

  public func addGem(gem: Gem) : async Result.Result<(), Text> {
    if (gems.get(gem.id) != null) {
      return #err("Gem with this ID already exists");
    };
    gems.put(gem.id, gem);
    #ok(())
  };

  public func removeGem(id: Text) : async Result.Result<(), Text> {
    switch (gems.remove(id)) {
      case null { #err("Gem not found") };
      case (?_) { #ok(()) };
    }
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
    gemsEntries := [];
  };
}
