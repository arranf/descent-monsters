import { Trait } from "./models";

export function traitTooltip(trait: Trait): string {
  switch (trait) {
    case Trait.WILDERNESS:
      return "Trees";
    case Trait.DARK:
      return "Moon";
    case Trait.CAVE:
      return "Cave Mouth";
    case Trait.COLD:
      return "Snowflake";
    case Trait.HOT:
      return "Flame";
    case Trait.MOUNTAIN:
      return "Mountain";
    case Trait.CURSED:
      return "Skull";
    case Trait.CIVILIZED:
      return "Courthouse";
    case Trait.BUILDING:
      return "Crude Doorway";
    case Trait.WATER:
      return "Water Drops";
  }
}

import { Tier } from "./models";

export function valueForTier(tier: Tier): 0 | 1 | 2 {
  switch (tier) {
    case Tier.ONE:
      return 0;
    case Tier.TWO:
      return 1;
    case Tier.THREE:
      return 2;
  }
}
