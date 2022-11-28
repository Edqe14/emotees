import { openModal, useModals } from '@mantine/modals';
import { Button, Select, Switch } from '@mantine/core';
import Twemoji from '@/components/Twemoji';
import useConfig, { AutoSort } from '../hooks/useConfig';
import useInternal from '../hooks/useInternal';
import applyCustomModalOptions from './applyCustomModalOptions';

export function ConfigContent() {
  const modals = useModals();
  const config = useConfig();

  return (
    <section>
      <Switch checked={config.onlyShowFavorites} onChange={(ev) => config.setOnlyShowFavorites(ev.target.checked)} className="mb-3" label="Only show favorites" />
      <Select
        label="Sort by"
        value={config.autoSort as unknown as string}
        onChange={(value) => config.setAutoSort(value as unknown as AutoSort)}
        data={[
          { label: 'Name (A - Z)', value: AutoSort.NAME as unknown as string },
          { label: 'Name (Z - A)', value: AutoSort.NAME_REVERSE as unknown as string },
          { label: 'Favorite', value: AutoSort.FAVORITE as unknown as string },
          { label: 'Total uses', value: AutoSort.USES as unknown as string },
          { label: 'Added at (ASC)', value: AutoSort.TIME as unknown as string },
          { label: 'Added at (DESC)', value: AutoSort.TIME_REVERSE as unknown as string },
        ]}
      />

      <section className="mt-4 w-full flex justify-end">
        <Button color="violet" onClick={() => modals.closeModal('configuration')}>Done!</Button>
      </section>
    </section>
  );
}

export default function openConfigModal() {
  useInternal.setState({ shortcutLock: true, pasteLock: true });

  openModal(
    applyCustomModalOptions({
      modalId: 'configuration',
      title: (
        <Twemoji>Configuration ⚙️</Twemoji>
      ),
      centered: true,
      size: 'md',
      classNames: {
        header: 'mb-0'
      },
      children: <ConfigContent />,
      onClose: () => useInternal.setState({ pasteLock: false, shortcutLock: false }),
    })
  );
}