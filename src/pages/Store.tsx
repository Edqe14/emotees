import { Button, Input, Textarea, TextInput } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import type { FileRejection } from 'react-dropzone';
import { useForm } from '@mantine/form';
import Layout from '@/components/Layout';
import useUser from '@/lib/hooks/useUser';
import Twemoji from '@/components/Twemoji';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import Dropzone from '@/components/Dropzone';
import getFileRejectionMessasge from '@/lib/helpers/getFileRejectionMessage';

function PublishStoreContent() {
  const form = useForm({
    initialValues: {
      thumbnail: null as File | null,
      name: '',
      content: ''
    }
  });

  const showRejectionNotification = (rejection: FileRejection) => {
    showNotification({
      title: <Twemoji>Error ❌</Twemoji>,
      message: getFileRejectionMessasge(rejection.errors[0].code),
      color: 'red',
    });
  };

  // TODO: publishing logic

  return (
    <section>
      <Input.Wrapper required label="Thumbnail" classNames={{ label: 'mb-1', root: 'mb-3' }}>
        <Dropzone onDrop={(files) => form.setFieldValue('thumbnail', files[0])} onReject={(rejections) => showRejectionNotification(rejections[0])} />
      </Input.Wrapper>

      <TextInput required label="Name" classNames={{ label: 'mb-1', root: 'mb-3' }} {...form.getInputProps('name')} />

      <Textarea required label="Content" classNames={{ label: 'mb-1', root: 'mb-5' }} {...form.getInputProps('content')} />

      <section className="flex justify-end gap-3">
        <Button>Preview</Button>
        <Button color="violet">Publish</Button>
      </section>
    </section>
  );
}

export default function Store() {
  const user = useUser((s) => s.uid);

  const openPublishModal = () => {
    openModal(applyCustomModalOptions({
      modalId: 'publish-store',
      centered: true,
      title: <Twemoji>📤 Publish packs</Twemoji>,
      children: <PublishStoreContent />,
      size: 'lg'
    }));
  };

  return (
    <Layout>
      {user === '9c20oqwqXjgWEBBBDyrOikmKFuj1' && (
        <section className="w-full flex justify-end">
          <Button onClick={openPublishModal} leftIcon={<Twemoji>☁️</Twemoji>}>Publish</Button>
        </section>
      )}

    </Layout>
  );
}