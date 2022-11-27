export default function concat(...args: (string | null | undefined | number)[]) {
  return args.filter(Boolean).join(' ');
}