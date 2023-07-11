interface GeneralData {
  fileName: string;
  alt: string;
  description: string;
}

export interface AdventureData extends GeneralData {
  game: string;
}

export interface EmoteData extends GeneralData {
  name: string;
}

export interface OutfitData extends GeneralData {
  name: string;
  credits: {
    [key: string]: string;
  };
}

export interface PortraitsData extends GeneralData {
  name: string;
  artist: string;
  url: string;
}

export interface PosesData extends GeneralData {
  name: string;
}
