export interface EmoteStruct {
  name: string;
  file: string;
  favorite?: boolean;
  createdAt?: string | Date;
}

export default class Emote {
  public name: string;

  public file: string;

  public favorite = false;

  public createdAt: Date;

  constructor(initiator: EmoteStruct) {
    if (!initiator) {
      throw new TypeError('Emote constructor requires an initiator');
    }

    this.name = initiator.name;
    this.file = initiator.file;
    this.favorite = initiator.favorite ?? false;
    this.createdAt = new Date(initiator.createdAt ?? Date.now());
  }

  setName(name: string) {
    this.name = name;

    return this;
  }

  setFile(file: string) {
    this.file = file;

    return this;
  }

  setFavorite(favorite: boolean) {
    this.favorite = favorite;

    return this;
  }

  setCreatedAt(createdAt: string | Date) {
    this.createdAt = new Date(createdAt);

    return this;
  }
}