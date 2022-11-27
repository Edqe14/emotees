import { openModal, useModals } from '@mantine/modals';
import { Button, Switch } from '@mantine/core';
import Twemoji from '@/components/Twemoji';
import useConfig from '../hooks/useConfig';
import useInternal from '../hooks/useInternal';
import applyCustomModalOptions from './applyCustomModalOptions';

export function ConfigContent() {
  const modals = useModals();
  const config = useConfig();

  return (
    <section>
      <Switch checked={config.onlyShowFavorites} onChange={(ev) => config.setOnlyShowFavorites(ev.target.checked)} label="Only show favorites" />

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