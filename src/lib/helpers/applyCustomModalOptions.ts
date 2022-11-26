import { ModalSettings } from '@mantine/modals/lib/context';

export default function applyCustomModalOptions<T extends ModalSettings>(options: T) {
  return {
    ...options,
    classNames: {
      title: 'font-bold text-lg',
      ...(options?.classNames ?? {})
    }
  } as T;
};