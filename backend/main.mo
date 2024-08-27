import Bool "mo:base/Bool";
import Char "mo:base/Char";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Order "mo:base/Order";

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
    featured: Bool;
    createdAt: Int;
  };

  private stable var gemsEntries : [(Text, Gem)] = [
    ("1", { id = "1"; title = "Awesome Project"; thumbnail = "https://fakeimg.pl/600x400?text=Awesome"; githubUrl = "https://github.com/awesome/project"; author = { name = "Alice Johnson"; avatar = "https://i.pravatar.cc/150?u=alice" }; featured = true; createdAt = Time.now() }),
    ("2", { id = "2"; title = "Cool Library"; thumbnail = "https://fakeimg.pl/600x400?text=Cool"; githubUrl = "https://github.com/cool/library"; author = { name = "Bob Smith"; avatar = "https://i.pravatar.cc/150?u=bob" }; featured = false; createdAt = Time.now() - 86400_000_000_000 }),
    ("3", { id = "3"; title = "Useful Tool"; thumbnail = "https://fakeimg.pl/600x400?text=Useful"; githubUrl = "https://github.com/useful/tool"; author = { name = "Charlie Brown"; avatar = "https://i.pravatar.cc/150?u=charlie" }; featured = true; createdAt = Time.now() - 172800_000_000_000 }),
    ("4", { id = "4"; title = "Great Framework"; thumbnail = "https://fakeimg.pl/600x400?text=Great"; githubUrl = "https://github.com/great/framework"; author = { name = "Diana Prince"; avatar = "https://i.pravatar.cc/150?u=diana" }; featured = false; createdAt = Time.now() - 259200_000_000_000 }),
    ("5", { id = "5"; title = "Amazing API"; thumbnail = "https://fakeimg.pl/600x400?text=Amazing"; githubUrl = "https://github.com/amazing/api"; author = { name = "Ethan Hunt"; avatar = "https://i.pravatar.cc/150?u=ethan" }; featured = true; createdAt = Time.now() - 345600_000_000_000 }),
    ("6", { id = "6"; title = "Fantastic SDK"; thumbnail = "https://fakeimg.pl/600x400?text=Fantastic"; githubUrl = "https://github.com/fantastic/sdk"; author = { name = "Fiona Gallagher"; avatar = "https://i.pravatar.cc/150?u=fiona" }; featured = false; createdAt = Time.now() - 432000_000_000_000 })
  ];
  private var gems = HashMap.HashMap<Text, Gem>(10, Text.equal, Text.hash);

  public func addGem(gem: Gem) : async Result.Result<(), Text> {
    if (gems.get(gem.id) != null) {
      return #err("Gem with this ID already exists");
    };
    let newGem = {
      gem with
      createdAt = Time.now();
    };
    gems.put(gem.id, newGem);
    #ok(())
  };

  public query func getGems() : async [Gem] {
    Iter.toArray(gems.vals())
  };

  public query func getFeaturedGems() : async [Gem] {
    Array.filter(Iter.toArray(gems.vals()), func (gem: Gem) : Bool { gem.featured })
  };

  public query func getLatestGems() : async [Gem] {
    Array.sort(Iter.toArray(gems.vals()), func (a: Gem, b: Gem) : Order.Order {
      Int.compare(Int.abs(b.createdAt), Int.abs(a.createdAt))
    })
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
