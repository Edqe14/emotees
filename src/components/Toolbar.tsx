import { ActionIcon } from '@mantine/core';
import { useDebouncedValue, useFocusWithin, useHotkeys, useMergedRef } from '@mantine/hooks';
import { IconAdjustments, IconPlus } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import useInternal from '@/lib/hooks/useInternal';
import Input from './Input';
import startNewEmojiFlow from '@/lib/helpers/startNewEmojiFlow';
import shortcutHandler from '@/lib/helpers/shortcutHandler';
import openConfigModal from '@/lib/helpers/openConfigModal';

export default function Toolbar() {
  const [search, setSearchQuery] = useInternal((s) => [s.searchQuery, s.setSearchQuery], shallow);
  const [searchQuery, setSearch] = useState(search);
  const [debounced] = useDebouncedValue(searchQuery, 150);

  const { ref, focused } = useFocusWithin();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useMergedRef(inputRef, ref);

  const newRef = useRef<HTMLButtonElement>(null);
  const configRef = useRef<HTMLButtonElement>(null);

  useHotkeys([
    [';', shortcutHandler(() => inputRef.current?.focus())],
    ['mod+K', shortcutHandler(() => inputRef.current?.focus())],
    ['N', shortcutHandler(() => newRef.current?.click())],
    ['mod+,', shortcutHandler(() => configRef.current?.click())],
  ]);

  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced]);

  return (
    <section className="flex gap-3 bg-slate-100 dark:bg-gray-800 shadow fixed bottom-0 right-0 left-1/2 -translate-x-1/2 p-3 w-min rounded-t-3xl items-center transition-all">
      <Input
        ref={inputRefs}
        value={searchQuery}
        onChange={(ev) => setSearch(ev.currentTarget.value.replace(/ /gi, '_'))}
        placeholder={focused ? 'Search' : 'Use ";" to search'}
      />

      <ActionIcon ref={configRef} onClick={openConfigModal} color="violet" variant="light" radius="xl">
        <IconAdjustments size={20} />
      </ActionIcon>

      <ActionIcon ref={newRef} onClick={() => startNewEmojiFlow()} color="violet" variant="light" radius="xl">
        <IconPlus size={20} />
      </ActionIcon>
    </section>
  );
}