export const DISCORD_EMOJI_URL_REGEX =
  /^https?:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(?:png|gif|jpg|jpeg|webp)/i;
export const DISCORD_STICKER_URL_REGEX =
  /^https?:\/\/media\.discordapp\.net\/stickers\/(\d+)\.(?:png|gif|jpg|jpeg|webp)/i;

export default function isDiscordEmojiURL(url: string): boolean {
  return DISCORD_EMOJI_URL_REGEX.test(url);
}

export function isDiscordStickerURL(url: string): boolean {
  return DISCORD_STICKER_URL_REGEX.test(url);
}
