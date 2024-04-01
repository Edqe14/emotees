import { showNotification } from "@mantine/notifications";
import { Menu, Tooltip } from "@mantine/core";
import {
  IconLink,
  IconPencil,
  IconStar,
  IconStarOff,
  IconTrash,
} from "@tabler/icons";
import { openModal } from "@mantine/modals";
import { logEvent } from "firebase/analytics";
import shallow from "zustand/shallow";
import { createRef, MouseEventHandler, useMemo } from "react";
import Emote from "@/lib/structs/Emote";
import applyCustomNotificationOptions from "@/lib/helpers/applyCustomNotification";
import Twemoji from "./Twemoji";
import useEmotes from "@/lib/hooks/useEmotes";
import useInternal from "@/lib/hooks/useInternal";
import applyCustomModalOptions from "@/lib/helpers/applyCustomModalOptions";
import { EmojiInfo } from "@/lib/helpers/startNewEmojiFlow";
import analytics from "@/lib/helpers/firebase/analytics";
import getConfirmation from "@/lib/helpers/getConfirmation";
import sleep from "@/lib/helpers/sleep";
import concat from "@/lib/helpers/concat";

const getUrl = (file: string, isSticker?: boolean, higherQuality = false) => {
  if (isSticker) {
    return `https://media.discordapp.net/stickers/${file}?size=${
      higherQuality ? 240 : 160
    }&quality=lossless`;
  }

  return `https://cdn.discordapp.com/emojis/${file}?size=${
    higherQuality ? 64 : 48
  }&quality=lossless`;
};

export default function EmoteView({ name, file, favorite, isSticker }: Emote) {
  const [
    setContextMenuItem,
    setContextMenuPosition,
    setShowContextMenu,
    setContextMenuFlipped,
  ] = useInternal(
    (s) => [
      s.setContextMenuItems,
      s.setContextMenuPosition,
      s.setShowContextMenu,
      s.setContextMenuFlipped,
    ],
    shallow
  );
  const setScrollPosition = useInternal((s) => s.setScrollPosition);
  const ref = createRef<HTMLSpanElement>();
  const url = useMemo(() => getUrl(file, isSticker), [file, isSticker]);
  const previewUrl = useMemo(
    () => getUrl(file, isSticker, true),
    [file, isSticker]
  );

  const onClick = async () => {
    setScrollPosition(window.scrollY);

    try {
      await navigator.clipboard.writeText(url);

      const { emotes, updateEmote } = useEmotes.getState();
      const index = emotes.findIndex((e) => e.name === name);
      if (index !== -1) {
        updateEmote(index, (current) => ({ totalUses: current.totalUses + 1 }));
        logEvent(analytics, "emote_copy", {
          name,
          total_uses: emotes[index].totalUses + 1,
        });
      }

      return showNotification(
        applyCustomNotificationOptions({
          title: <Twemoji>Copied 📋</Twemoji>,
          message: (
            <Twemoji>
              Successfully copied{" "}
              <span className="font-semibold text-slate-500 dark:text-slate-300">
                {name}
              </span>{" "}
              to your clipboard!
            </Twemoji>
          ),
          color: "teal",
        })
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return showNotification(
        applyCustomNotificationOptions({
          title: "Oops, something went wrong",
          message: (
            <Twemoji>
              Failed to copy{" "}
              <span className="font-semibold text-slate-300">{name}</span> to
              your clipboard!
            </Twemoji>
          ),
          color: "red",
        })
      );
    }
  };

  const del = async () => {
    setScrollPosition(window.scrollY);

    const { emotes, removeEmote } = useEmotes.getState();
    const index = emotes.findIndex((e) => e.name === name);

    if (index !== -1) {
      const confirm = await getConfirmation({
        title: "Are you sure?",
        centered: true,
        labels: {
          cancel: "Nevermind",
          confirm: "Do it!",
        },
        confirmProps: {
          color: "red",
        },
        children: (
          <Twemoji>
            This will remove{" "}
            <span className="font-semibold text-slate-500 dark:text-slate-300">
              {name}
            </span>{" "}
            from your collection.
          </Twemoji>
        ),
      });

      if (!confirm) return;
      removeEmote(index);

      return showNotification(
        applyCustomNotificationOptions({
          title: "Emote removed",
          message: (
            <Twemoji>
              Successfully removed{" "}
              <span className="font-semibold text-slate-500 dark:text-slate-300">
                {name}
              </span>{" "}
              from your collection.
            </Twemoji>
          ),
          color: "red",
        })
      );
    }
  };

  const edit = () => {
    setScrollPosition(window.scrollY);

    const { emotes } = useEmotes.getState();
    const index = emotes.findIndex((e) => e.name === name);

    if (index !== -1) {
      openModal(
        applyCustomModalOptions({
          modalId: "emote-info-edit",
          title: <Twemoji>What do you want to be changed? 🤔</Twemoji>,
          centered: true,
          size: "md",
          children: <EmojiInfo url={url} index={index} name={name} />,
          onClose: () =>
            useInternal.setState({ pasteLock: false, shortcutLock: false }),
        })
      );
    }
  };

  const toggleFavorite = () => {
    setScrollPosition(window.scrollY);

    const { emotes, updateEmote } = useEmotes.getState();
    const index = emotes.findIndex((e) => e.name === name);

    if (index !== -1) {
      updateEmote(index, () => ({ favorite: !favorite }));

      if (!favorite) {
        showNotification(
          applyCustomNotificationOptions({
            title: "Emote favorited",
            message: (
              <Twemoji>
                Successfully favorited{" "}
                <span className="font-semibold text-slate-500 dark:text-slate-300">
                  {name}
                </span>
                .
              </Twemoji>
            ),
            color: "teal",
          })
        );
      } else {
        showNotification(
          applyCustomNotificationOptions({
            title: "Emote unfavorited",
            message: (
              <Twemoji>
                Successfully unfavorited{" "}
                <span className="font-semibold text-slate-500 dark:text-slate-300">
                  {name}
                </span>
                .
              </Twemoji>
            ),
            color: "red",
          })
        );
      }
    }
  };

  const onContextMenu: MouseEventHandler<HTMLSpanElement> = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    setContextMenuItem(
      <>
        <Menu.Label>{isSticker ? "Sticker" : "Emoji"}</Menu.Label>

        <Menu.Item onClick={onClick} icon={<IconLink size={16} />}>
          Copy URL
        </Menu.Item>
        <Menu.Item onClick={edit} icon={<IconPencil size={16} />}>
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={toggleFavorite}
          color={!favorite ? "yellow" : "red"}
          icon={!favorite ? <IconStar size={16} /> : <IconStarOff size={16} />}
        >
          {!favorite ? "Favorite" : "Unfavorite"}
        </Menu.Item>
        <Menu.Item onClick={del} color="red" icon={<IconTrash size={16} />}>
          Delete
        </Menu.Item>
      </>
    );

    if (ref.current) {
      await sleep();

      const rect = ref.current.getBoundingClientRect();
      const menu = document.querySelector("#context_menu");
      const height = menu?.getBoundingClientRect().height || 260;

      const y =
        ev.clientY + height > window.innerHeight
          ? window.scrollY + rect.bottom - height - rect.height - 5
          : window.scrollY + rect.bottom + 5;

      setContextMenuFlipped(ev.clientY + rect.bottom + 5 > window.innerHeight);
      setContextMenuPosition([rect.left + rect.width / 2, y]);
    }

    setShowContextMenu(true);
  };

  return (
    <Tooltip
      label={`:${name}:`}
      withArrow
      arrowSize={6}
      position="bottom"
      color="violet"
      openDelay={200}
    >
      <span
        ref={ref}
        onContextMenu={onContextMenu}
        onClick={onClick}
        className={concat(
          "relative p-2 rounded-md cursor-pointer hover:bg-slate-200 hover:dark:bg-slate-700 transition-colors duration-100 bg-opacity-50 flex items-center justify-center w-full"
        )}
      >
        {favorite && (
          <IconStar
            className="drop-shadow text-yellow-500 fill-yellow-500 absolute top-0 right-0"
            size={18}
          />
        )}
        <img
          loading="lazy"
          decoding="async"
          draggable={false}
          key={name}
          src={previewUrl}
          alt={name}
          className={concat(!isSticker && "w-16", isSticker && "w-32")}
        />
      </span>
    </Tooltip>
  );
}
