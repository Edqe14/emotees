import { ActionIcon, Card, Image, Menu, Tooltip } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons';
import { openModal } from '@mantine/modals';
import { ref, remove } from 'firebase/database';
import { showNotification } from '@mantine/notifications';
import { logEvent } from 'firebase/analytics';
import { StoreItem } from '@/lib/hooks/useStore';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import Twemoji from './Twemoji';
import EmoteImporter from './EmoteImporter';
import EmoteView from './EmoteView';
import useInternal from '@/lib/hooks/useInternal';
import sleep from '@/lib/helpers/sleep';
import database from '@/lib/helpers/firebase/database';
import applyCustomNotificationOptions from '@/lib/helpers/applyCustomNotification';
import analytics from '@/lib/helpers/firebase/analytics';

export default function StoreEntry(props: StoreItem) {
  const setContextMenuItem = useInternal((s) => s.setContextMenuItems);
  const importEntry = () => {
    openModal(applyCustomModalOptions({
      modalId: 'import-confirm-modal',
      title: <Twemoji>Are you sure? 🤔</Twemoji>,
      centered: true,
      children: (<EmoteImporter emotes={props.content} />),
    }));

    logEvent(analytics, 'item_import', {
      item: {
        name: props.name,
        id: props.id,
      }
    });
  };

  const openPreview = () => {
    openModal(applyCustomModalOptions({
      modalId: 'store-preview',
      size: 'lg',
      classNames: {
        title: 'font-medium text-lg'
      },
      title: (
        <p>Previewing <span className="font-bold">{props.name}</span></p>
      ),
      centered: true,
      children: (
        <section className="flex flex-wrap gap-2 justify-center">
          {props.content.map((e) => <EmoteView key={e.name} {...e} />)}
        </section>
      )
    }));

    logEvent(analytics, 'view_item', {
      item: {
        name: props.name,
        id: props.id,
      }
    });
  };

  const del = async () => {
    try {
      await remove(ref(database, `store/${props.id}`));

      return showNotification(applyCustomNotificationOptions({
        title: <Twemoji>Entry deleted ✅</Twemoji>,
        color: 'teal',
        message: 'Successfully removed entry.'
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      return showNotification(applyCustomNotificationOptions({
        title: <Twemoji>Something went wrong 😖</Twemoji>,
        color: 'red',
        message: 'Failed to remove entry.'
      }));
    }
  };

  const onMenu = async () => {
    await sleep();

    setContextMenuItem(
      <>
        <Menu.Divider />

        <Menu.Label>Store Entry</Menu.Label>

        <Menu.Item onClick={del} color="red" icon={<IconTrash size={16} />}>
          Delete
        </Menu.Item>
      </>
    );
  };

  return (
    <Card onContextMenu={onMenu} className="bg-slate-200 dark:bg-slate-800 shadow-none hover:shadow-lg transition-all duration-200 ease-in-out" radius="md">
      <Card.Section className="mb-4 overflow-hidden">
        <Image
          className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          onClick={openPreview}
          src={props.thumbUrl}
          height={160}
          alt={props.name}
        />
      </Card.Section>

      <section className="flex justify-between items-center gap-4">
        <section>
          <h2 className="text-xl font-semibold capitalize">{props.name}</h2>
          <p className="opacity-70"><span className="font-semibold text-gray-900 dark:text-slate-300">{props.content.length}</span> emotes</p>
        </section>

        <Tooltip label="Import" color="violet" withinPortal withArrow position="left">
          <ActionIcon onClick={importEntry} color="violet">
            <IconPlus size={24} />
          </ActionIcon>
        </Tooltip>
      </section>
    </Card>
  );
}