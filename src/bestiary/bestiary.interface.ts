export interface IBestiaryPayload {
  page: number;
  size: number;
  search: {
    value: string;
    exact: boolean;
  };
  order: Array<{
    field: string;
    direction: 'asc' | 'desc';
  }>;
}

export interface IBestiaryPreviewInfo {
  name: {
    rus: string;
    eng: string;
  };
  type: string;
  challengeRating: string;
  url: string;
  source: {
    shortName: string;
    name: string;
    group: {
      name: string;
      shortName: string;
    };
  };
}

export interface IBestiaryEntry {
  name: {
    rus?: string;
    eng: string;
  };
  size: {
    rus?: string;
    eng?: string;
    cell: string;
  };
  type: {
    name?: string;
    tags?: string[];
  };
  challengeRating: string;
  url: string;
  source: {
    shortName?: string;
    name?: string;
    group?: {
      name: string;
      shortName: string;
    };
    homebrew?: boolean;
  };
  id: number;
  proficiencyBonus: string;
  alignment: string;
  armorClass: number;
  armorText?: string;
  armors?: string[];
  hits: {
    average?: number;
    formula?: string;
    bonus?: number;
    text?: string;
  };
  speed: {
    value?: number;
  }[];
  ability: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wiz?: number;
    cha: number;
  };
  skills: {
    name: string;
    value: number;
  }[];
  senses: {
    passivePerception?: string;
  };
  languages: string[];
  feats?: string[];
  actions: {
    name: string;
    value: string;
  }[];
  reactions?: {
    name: string;
    value: string;
  }[];
  savingThrows?: string[];
  damageImmunities?: string[];
  conditionImmunities?: string[];
  description?: string;
  tags: {
    name: string;
    description: string;
  }[];
  images: string[];
}
