import { object, string, number, bool } from 'yup';

interface Emote {
  name: string;
  file: string;
  favorite: boolean;
  addedAt: number;
  totalUses: number;
}

export default Emote;

export const EmoteValidator = object().shape({
  name: string().required().transform((value) => value.trim().replace(/ /gi, '_')),
  file: string().required().matches(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi).transform((value) => value.trim().match(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)?.[0]),
  favorite: bool().required(),
  addedAt: number().default(() => Date.now()),
  totalUses: number().required(),
});