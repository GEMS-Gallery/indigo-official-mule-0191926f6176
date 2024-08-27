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
    description: Text;
  };

  private stable var gemsEntries : [(Text, Gem)] = [
    ("1", { id = "1"; title = "Awesome Project"; thumbnail = "https://fakeimg.pl/600x400?text=Awesome"; githubUrl = "https://github.com/awesome/project"; description = "An awesome project for developers" }),
    ("2", { id = "2"; title = "Cool Library"; thumbnail = "https://fakeimg.pl/600x400?text=Cool"; githubUrl = "https://github.com/cool/library"; description = "A cool library for your next project" }),
    ("3", { id = "3"; title = "Useful Tool"; thumbnail = "https://fakeimg.pl/600x400?text=Useful"; githubUrl = "https://github.com/useful/tool"; description = "A useful tool for productivity" }),
    ("4", { id = "4"; title = "Great Framework"; thumbnail = "https://fakeimg.pl/600x400?text=Great"; githubUrl = "https://github.com/great/framework"; description = "A great framework for building apps" }),
    ("5", { id = "5"; title = "Amazing API"; thumbnail = "https://fakeimg.pl/600x400?text=Amazing"; githubUrl = "https://github.com/amazing/api"; description = "An amazing API for developers" }),
    ("6", { id = "6"; title = "Fantastic SDK"; thumbnail = "https://fakeimg.pl/600x400?text=Fantastic"; githubUrl = "https://github.com/fantastic/sdk"; description = "A fantastic SDK for your projects" })
  ];
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
  };
}
