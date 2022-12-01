import { Menu, Text } from '@mantine/core';
import shallow from 'zustand/shallow';
import { useWindowEvent } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons';
import { createRef } from 'react';
import useInternal from '@/lib/hooks/useInternal';
import useTheme from '@/lib/hooks/useTheme';
import getOSModKey from '@/lib/helpers/getOSModKey';

export default function ContextMenu() {
  const width = 240;
  const closeDuration = 200;

  const { theme, toggleTheme } = useTheme();
  const [show, position, items] = useInternal((s) => [s.showContextMenu, s.contextMenuPosition, s.contextMenuItems], shallow);
  const [setPosition, setShow, setItems] = useInternal((s) => [s.setContextMenuPosition, s.setShowContextMenu, s.setContextMenuItems], shallow);

  const timeoutRef = createRef<number>();
  const close = () => {
    setShow(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // @ts-expect-error - this is a valid use of refs
    timeoutRef.current = setTimeout(() => {
      setItems(null);

      // @ts-expect-error - this is a valid use of refs
      timeoutRef.current = null;
    }, closeDuration);
  };

  useWindowEvent('blur', close);
  useWindowEvent('click', close);
  useWindowEvent('contextmenu', (ev) => {
    if (useInternal.getState().pasteLock) return;

    ev.preventDefault();

    setItems(null);
    setPosition([ev.clientX, ev.clientY + 20]);
    setShow(true);
  });

  return (
    <Menu
      withArrow
      position="bottom"
      arrowSize={9}
      zIndex={301}
      onClose={close}
      onChange={(opened) => setShow(opened)}
      transitionDuration={closeDuration}
      width={width}
      opened={show}
      styles={{
        dropdown: {
          transform: `translate3d(${position[0] - width / 2}px, ${
            position[1]
          }px, 0)`,
        },
      }}
      classNames={{
        dropdown: 'fixed',
        arrow: 'left-1/2 -translate-x-1/2 rotate-45',
      }}
    >
      <Menu.Dropdown className="dark:bg-slate-800">
        <Menu.Item
          onClick={toggleTheme}
          icon={
            theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />
          }
          rightSection={
            <Text color="dimmed" size="xs">
              {getOSModKey()} + J
            </Text>
          }>
          Toggle Theme
        </Menu.Item>

        {items}
      </Menu.Dropdown>
    </Menu>
  );
}