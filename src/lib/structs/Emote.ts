import { object, string, number, bool } from "yup";

interface Emote {
  name: string;
  file: string;
  favorite: boolean;
  addedAt: number;
  totalUses: number;
  isSticker?: boolean;
  animated?: boolean;
}

export default Emote;

export const EmoteValidator = object().shape({
  name: string()
    .required()
    .transform((value) => value.trim().replace(/ /gi, "_")),
  file: string()
    .required()
    .matches(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)
    .transform(
      (value) => value.trim().match(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)?.[0]
    ),
  favorite: bool().required(),
  addedAt: number()
    .default(() => Date.now())
    .optional(),
  totalUses: number().default(0).optional(),
  isSticker: bool().optional(),
});

export const EmoteValidatorPublishing = object().shape({
  name: string()
    .required()
    .transform((value) => value.trim().replace(/ /gi, "_")),
  file: string()
    .required()
    .matches(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)
    .transform(
      (value) => value.trim().match(/(\d+)\.(?:png|gif|jpg|jpeg|webp)/gi)?.[0]
    ),
  isSticker: bool().optional(),
});
