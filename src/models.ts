export interface Monster {
  name: string;
  act: Act;
  characteristics: string[];
  attack: string;
  expansion: Expansion;
  image: string;
  traits: Trait[];
  ability_rules: string[];
  group_size: string[];
  xws: string;
  tier: Tier;
  link: string;
}

export enum Tier {
  ONE = "Tier One",
  TWO = "Tier Two",
  THREE = "Tier Three",
}

export type Act = "I" | "II";

export const enum Expansion {
  BASE_GAME = "Base Game",
  CONVERSION_KIT = "Conversion Kit",
  LAIR_OF_THE_WRYM = "Lair Of The Wyrm",
  LABYRINTH_OF_RUIN = "Labyrinth Of Ruin",
  THE_TROLLFENS = "The Trollfens",
  SHADOW_OF_NEREKHALL = "Shadow Of Nerekhall",
  MANOR_OF_RAVENS = "Manor Of Ravens",
  MISTS_OF_BILEHALL = "Mists Of Bilehall",
  THE_CHAINS_THAT_RUST = "The Chains That Rust",
  OATH_OF_THE_OUTCAST = "Oath Of The Outcast",
  CROWN_OF_DESTINY = "Crown Of Destiny",
  CRUSADE_OF_THE_FORGOTTEN = "Crusade Of The Forgotten",
  GUARDIANS_OF_DEEPHALL = "Guardians Of Deephall",
  VISIONS_OF_DAWN = "Visions Of Dawn",
  BONDS_OF_THE_WILD = "Bonds Of The Wild",
  TREATY_OF_CHAMPIONS = "Treaty Of Champions",
  STEWARDS_OF_THE_SECRET = "Stewards Of The Secret",
  SHARDS_OF_EVERDARK = "Shards Of Everdark",
}

export const enum Trait {
  WILDERNESS = "Wilderness",
  DARK = "Dark",
  CAVE = "Cave",
  COLD = "Cold",
  HOT = "Hot",
  MOUNTAIN = "Mountain",
  CURSED = "Cursed",
  CIVILIZED = "Civilized",
  BUILDING = "Building",
  WATER = "Water",
}
