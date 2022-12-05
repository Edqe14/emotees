export default function getFileRejectionMessasge(code: string) {
  if (code === 'file-too-large') return 'File is too large.';
  if (code === 'file-invalid-type') return 'File type is not supported.';

  return 'Oops, something went wrong.';
}