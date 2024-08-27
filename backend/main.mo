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
    category: Text;
  };

  private stable var gemsEntries : [(Text, Gem)] = [
    ("1", { id = "1"; title = "E-commerce Template"; thumbnail = "https://fakeimg.pl/600x400?text=E-commerce"; githubUrl = "https://github.com/awesome/ecommerce"; author = { name = "Alice Johnson"; avatar = "https://i.pravatar.cc/150?u=alice" }; featured = true; createdAt = Time.now(); category = "Retail" }),
    ("2", { id = "2"; title = "SaaS Dashboard"; thumbnail = "https://fakeimg.pl/600x400?text=SaaS"; githubUrl = "https://github.com/cool/saas-dashboard"; author = { name = "Bob Smith"; avatar = "https://i.pravatar.cc/150?u=bob" }; featured = false; createdAt = Time.now() - 86400_000_000_000; category = "SaaS" }),
    ("3", { id = "3"; title = "Legal Firm Website"; thumbnail = "https://fakeimg.pl/600x400?text=Legal"; githubUrl = "https://github.com/useful/legal-website"; author = { name = "Charlie Brown"; avatar = "https://i.pravatar.cc/150?u=charlie" }; featured = true; createdAt = Time.now() - 172800_000_000_000; category = "Legal" }),
    ("4", { id = "4"; title = "Restaurant Booking System"; thumbnail = "https://fakeimg.pl/600x400?text=Restaurant"; githubUrl = "https://github.com/great/restaurant-booking"; author = { name = "Diana Prince"; avatar = "https://i.pravatar.cc/150?u=diana" }; featured = false; createdAt = Time.now() - 259200_000_000_000; category = "Retail" }),
    ("5", { id = "5"; title = "Fitness Tracker App"; thumbnail = "https://fakeimg.pl/600x400?text=Fitness"; githubUrl = "https://github.com/amazing/fitness-tracker"; author = { name = "Ethan Hunt"; avatar = "https://i.pravatar.cc/150?u=ethan" }; featured = true; createdAt = Time.now() - 345600_000_000_000; category = "SaaS" }),
    ("6", { id = "6"; title = "Educational Platform"; thumbnail = "https://fakeimg.pl/600x400?text=Education"; githubUrl = "https://github.com/fantastic/edu-platform"; author = { name = "Fiona Gallagher"; avatar = "https://i.pravatar.cc/150?u=fiona" }; featured = false; createdAt = Time.now() - 432000_000_000_000; category = "SaaS" })
  ];
  private var gems = HashMap.HashMap<Text, Gem>(10, Text.equal, Text.hash);

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

  public query func getGemsByCategory(category: Text) : async [Gem] {
    if (category == "All") {
      Iter.toArray(gems.vals())
    } else {
      Array.filter(Iter.toArray(gems.vals()), func (gem: Gem) : Bool { gem.category == category })
    }
  };

  system func preupgrade() {
    gemsEntries := Iter.toArray(gems.entries());
  };

  system func postupgrade() {
    gems := HashMap.fromIter<Text, Gem>(gemsEntries.vals(), 10, Text.equal, Text.hash);
  };
}
