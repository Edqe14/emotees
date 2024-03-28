import { Button } from '@mantine/core';
import { openModal, openConfirmModal, closeModal, closeAllModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconBrandGoogle, IconBrandGithub, IconBrandTwitter, IconFileExport, IconFileImport, IconTrash } from '@tabler/icons';
import Twemoji from '@/components/Twemoji';
import HelpMenu from '@/components/HelpMenu';
import useEmotes from '../hooks/useEmotes';
import useInternal from '../hooks/useInternal';
import applyCustomModalOptions from './applyCustomModalOptions';
import exportEmotes from './export';
import { login } from './firebase/auth';
import importEmotes from './import';

export const loginModal = () => {
  openModal(
    applyCustomModalOptions({
      modalId: 'login-modal',
      title: 'Login',
      centered: true,
      children: (
        <section className="flex flex-col items-center gap-2">
          <Button
            color="teal"
            onClick={async () => {
              await login('google');
              closeModal('login-modal');
            }}>
            Continue with <IconBrandGoogle className="ml-2" size={20} />
          </Button>
          <Button
            color="violet"
            onClick={async () => {
              await login('github');
              closeModal('login-modal');
            }}>
            Continue with <IconBrandGithub className="ml-2" size={20} />
          </Button>
          <Button
            color="blue"
            onClick={async () => {
              await login('twitter');
              closeModal('login-modal');
            }}>
            Continue with <IconBrandTwitter className="ml-2" size={20} />
          </Button>
        </section>
      ),
    })
  );
};

const clearAll = () => {
  openConfirmModal(
    applyCustomModalOptions({
      modalId: 'clear-all-modal',
      centered: true,
      title: <Twemoji>Are you sure? 😣</Twemoji>,
      children: <p>There is no turning back!</p>,
      labels: {
        cancel: 'Nevermind',
        confirm: 'Do it!',
      },
      confirmProps: {
        color: 'red',
      },
      onConfirm: () => {
        closeAllModals();
        useEmotes.getState().setEmotes([]);

        showNotification({
          title: <Twemoji>Cleared ✨</Twemoji>,
          message: 'Cleared all emotes.',
          color: 'teal',
        });
      },
    })
  );
};

export const manageModal = () => {
  openModal(
    applyCustomModalOptions({
      modalId: 'manage-modal',
      title: <Twemoji>Manage 🔧</Twemoji>,
      classNames: {
        header: 'mb-2',
      },
      centered: true,
      children: (
        <section>
          <h4 className="font-medium text-sm mb-2 opacity-70">Emotes</h4>

          <section className="flex flex-col justify-center">
            <section className="flex gap-3 mb-3">
              <Button
                fullWidth
                rightIcon={<IconFileExport size={18} />}
                onClick={exportEmotes}>
                Export
              </Button>
              <Button
                fullWidth
                rightIcon={<IconFileImport size={18} />}
                onClick={importEmotes}>
                Import
              </Button>
            </section>

            <section className="flex items-center justify-center">
              <Button
                color="red"
                variant="outline"
                rightIcon={<IconTrash size={18} />}
                onClick={clearAll}>
                Clear all
              </Button>
            </section>
          </section>
        </section>
      ),
    })
  );
};

export const openHelp = () => {
  useInternal.setState({ pasteLock: true, shortcutLock: true });

  openModal(
    applyCustomModalOptions({
      title: <Twemoji>Need help? 💁</Twemoji>,
      centered: true,
      size: 'lg',
      classNames: {
        header: 'mb-3',
      },
      children: <HelpMenu />,
      onClose: () =>
        useInternal.setState({ pasteLock: false, shortcutLock: false }),
    })
  );
};