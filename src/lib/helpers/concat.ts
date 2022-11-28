export default function concat(...args: (string | null | undefined | number | boolean)[]) {
  return args.filter(Boolean).join(' ');
}