export const URL_REGEX = /^(http|https):\/\/[^ "]+$/;

export default function isURL(url: string): boolean {
  return URL_REGEX.test(url);
}