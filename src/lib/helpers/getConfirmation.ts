import { openConfirmModal } from '@mantine/modals';
import { OpenConfirmModal } from '@mantine/modals/lib/context';

export default function getConfirmation(options: OpenConfirmModal) {
  return new Promise((resolve) => {
    openConfirmModal({
      ...options,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}