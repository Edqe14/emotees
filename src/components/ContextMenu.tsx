import { Menu, Text } from "@mantine/core";
import shallow from "zustand/shallow";
import { useWindowEvent } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons";
import { createRef } from "react";
import useInternal from "@/lib/hooks/useInternal";
import useTheme from "@/lib/hooks/useTheme";
import getOSModKey from "@/lib/helpers/getOSModKey";
import concat from "@/lib/helpers/concat";

export default function ContextMenu() {
  const width = 240;
  const closeDuration = 200;

  const { theme, toggleTheme } = useTheme();
  const [show, position, items, flipped] = useInternal(
    (s) => [
      s.showContextMenu,
      s.contextMenuPosition,
      s.contextMenuItems,
      s.contextMenuFlipped,
    ],
    shallow
  );
  const [setPosition, setShow, setItems, setFlipped] = useInternal(
    (s) => [
      s.setContextMenuPosition,
      s.setShowContextMenu,
      s.setContextMenuItems,
      s.setContextMenuFlipped,
    ],
    shallow
  );

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

  useWindowEvent("blur", close);
  useWindowEvent("click", close);
  useWindowEvent("contextmenu", (ev) => {
    if (useInternal.getState().pasteLock) return;

    ev.preventDefault();

    const menu = document.querySelector("#context_menu");
    const height = menu?.getBoundingClientRect().height || 0;

    const y =
      ev.clientY + height > window.innerHeight
        ? window.scrollY + ev.clientY - height - 20
        : window.scrollY + (ev.clientY + 20);

    setFlipped(ev.clientY + height > window.innerHeight);
    setItems(null);
    setPosition([ev.clientX, y]);
    setShow(true);
  });

  return (
    <Menu
      withArrow
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
        dropdown: "absolute",
        arrow: concat(
          "left-1/2 -translate-x-1/2 rotate-45",
          flipped && "bottom-[-5.5px] top-[unset] rotate-[225deg]"
        ),
      }}
    >
      <Menu.Dropdown className="dark:bg-slate-800" id="context_menu">
        <Menu.Item
          onClick={toggleTheme}
          icon={
            theme === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />
          }
          rightSection={
            <Text color="dimmed" size="xs">
              {getOSModKey()} + J
            </Text>
          }
        >
          Toggle Theme
        </Menu.Item>

        {items}
      </Menu.Dropdown>
    </Menu>
  );
}
