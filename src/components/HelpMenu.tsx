import { useHotkeys } from '@mantine/hooks';
import { openModal } from '@mantine/modals';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import Twemoji from './Twemoji';

function HelpMainContent(){
  return <h2>testfef</h2>;
}

export default function HelpMenu() {
  const open = () => {
    openModal(applyCustomModalOptions({
      title: <Twemoji>Need help? 💁</Twemoji>,
      centered: true,
      classNames: {
        header: 'mb-2'
      },
      children: <HelpMainContent />
    }));
  };

  useHotkeys([
    ['mod+/', open],
  ]);

  return null;
}