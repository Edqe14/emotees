import { ActionIcon, Tooltip } from "@mantine/core";
import {
  useDebouncedValue,
  useFocusWithin,
  useHotkeys,
  useMergedRef,
} from "@mantine/hooks";
import {
  IconAdjustments,
  IconMoodSmile,
  IconPlus,
  IconSticker,
} from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import shallow from "zustand/shallow";
import { motion } from "framer-motion";
import useInternal from "@/lib/hooks/useInternal";
import Input from "./Input";
import startNewEmojiFlow from "@/lib/helpers/startNewEmojiFlow";
import shortcutHandler from "@/lib/helpers/shortcutHandler";
import openConfigModal from "@/lib/helpers/openConfigModal";
import useConfig from "@/lib/hooks/useConfig";

export default function Toolbar() {
  const [mode, toggleMode] = useConfig((s) => [s.mode, s.toggleMode], shallow);
  const [search, setSearchQuery] = useInternal(
    (s) => [s.searchQuery, s.setSearchQuery],
    shallow
  );
  const [searchQuery, setSearch] = useState(search);
  const [debounced] = useDebouncedValue(searchQuery, 150);

  const { ref, focused } = useFocusWithin();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useMergedRef(inputRef, ref);

  const newRef = useRef<HTMLButtonElement>(null);
  const configRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useHotkeys([
    [";", shortcutHandler(() => inputRef.current?.focus())],
    ["mod+K", shortcutHandler(() => inputRef.current?.focus())],
    ["mod+alt+N", shortcutHandler(() => newRef.current?.click())],
    ["mod+,", shortcutHandler(() => configRef.current?.click())],
    ["s", shortcutHandler(() => toggleRef.current?.click())],
    [
      "mod+alt+F",
      shortcutHandler(() =>
        useConfig.setState((s) => ({ onlyShowFavorites: !s.onlyShowFavorites }))
      ),
    ],
  ]);

  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced]);

  return (
    <motion.section
      className="flex gap-3 bg-slate-100 dark:bg-gray-800 z-50 shadow fixed bottom-0 right-0 left-1/2 p-3 w-min rounded-t-3xl items-center transition-all"
      initial={{ y: "200%", x: "-50%" }}
      animate={{ y: "0%", x: "-50%" }}
      exit={{ y: "200%", x: "-50%" }}
      transition={{ duration: 0.25, ease: "circIn" }}
    >
      <Input
        ref={inputRefs}
        value={searchQuery}
        onChange={(ev) => setSearch(ev.currentTarget.value.replace(/ /gi, "_"))}
        placeholder={focused ? "Search" : 'Use ";" to search'}
      />

      <Tooltip
        label={`Show ${mode === "emojis" ? "Stickers" : "Emojis"}`}
        withArrow
        arrowSize={6}
        openDelay={200}
        color="violet"
      >
        <ActionIcon
          ref={toggleRef}
          onClick={toggleMode}
          color="violet"
          variant="light"
          radius="xl"
        >
          {mode === "emojis" && <IconSticker size={20} />}
          {mode === "stickers" && <IconMoodSmile size={20} />}
        </ActionIcon>
      </Tooltip>

      <Tooltip
        label="Settings"
        withArrow
        arrowSize={6}
        openDelay={200}
        color="violet"
      >
        <ActionIcon
          ref={configRef}
          onClick={openConfigModal}
          color="violet"
          variant="light"
          radius="xl"
        >
          <IconAdjustments size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip
        label="Add"
        withArrow
        arrowSize={6}
        openDelay={200}
        color="violet"
      >
        <ActionIcon
          ref={newRef}
          onClick={() => startNewEmojiFlow()}
          color="violet"
          variant="light"
          radius="xl"
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Tooltip>
    </motion.section>
  );
}
