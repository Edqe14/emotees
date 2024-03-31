import { ActionIcon, Avatar, Menu } from "@mantine/core";
import {
  IconBasket,
  IconMoon,
  IconQuestionMark,
  IconSettings,
  IconSun,
  IconUser,
  IconUserOff,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useHotkeys } from "@mantine/hooks";
import useTheme from "@/lib/hooks/useTheme";
import Logo from "@/components/Logo";
import concat from "@/lib/helpers/concat";
import useUser from "@/lib/hooks/useUser";
import auth from "@/lib/helpers/firebase/auth";
import shortcutHandler from "@/lib/helpers/shortcutHandler";
import { loginModal, manageModal, openHelp } from "@/lib/helpers/modals";

export default function Navbar({ className }: { className?: string }) {
  const [uid, photo] = useUser((s) => [s.uid, s.photoURL], shallow);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useHotkeys([["mod+/", shortcutHandler(openHelp)]]);

  return (
    <nav
      className={concat(
        "bg-white dark:bg-gray-900 flex w-full items-center justify-between transition-colors duration-100 z-[310] gap-4",
        className
      )}
    >
      <Logo />

      <section className="flex gap-3 items-center">
        <ActionIcon
          onClick={() => navigate("/store")}
          color="violet"
          variant="light"
          radius="xl"
        >
          <IconBasket size={20} />
        </ActionIcon>

        <ActionIcon
          color="violet"
          variant="light"
          radius="xl"
          onClick={toggleTheme}
        >
          {theme === "dark" && <IconSun size={20} />}
          {theme === "light" && <IconMoon size={20} />}
        </ActionIcon>

        <ActionIcon
          color="violet"
          variant="light"
          radius="xl"
          onClick={openHelp}
        >
          <IconQuestionMark size={20} />
        </ActionIcon>

        <Menu
          withArrow
          withinPortal
          zIndex={320}
          width={150}
          position="bottom"
          offset={15}
          classNames={{
            dropdown: "dark:bg-slate-800",
          }}
        >
          <Menu.Target>
            <ActionIcon className="w-auto h-auto" radius="xl">
              <Avatar radius="xl" src={photo} alt="no image here" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={manageModal} icon={<IconSettings size={16} />}>
              Manage
            </Menu.Item>

            {!uid && (
              <Menu.Item onClick={loginModal} icon={<IconUser size={16} />}>
                Login
              </Menu.Item>
            )}

            {uid && (
              <Menu.Item
                color="red"
                onClick={() => auth.signOut()}
                icon={<IconUserOff size={16} />}
              >
                Logout
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </section>
    </nav>
  );
}
