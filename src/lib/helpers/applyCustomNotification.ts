import { NotificationProps } from '@mantine/notifications';

export default function applyCustomNotificationOptions(options: NotificationProps) {
  return {
    ...options,
    classNames: {
      root: 'bg-white dark:bg-gray-800',
      title: 'font-bold',
      ...(options?.classNames ?? {})
    }
  } as NotificationProps;
}