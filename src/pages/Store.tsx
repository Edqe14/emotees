import { Button, Input, Textarea, TextInput } from '@mantine/core';
import { openModal, useModals } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import type { FileRejection } from 'react-dropzone';
import { useForm } from '@mantine/form';
import { ref, set } from 'firebase/database';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { pick } from 'lodash-es';
import Layout from '@/components/Layout';
import useUser from '@/lib/hooks/useUser';
import Twemoji from '@/components/Twemoji';
import applyCustomModalOptions from '@/lib/helpers/applyCustomModalOptions';
import Dropzone from '@/components/Dropzone';
import getFileRejectionMessasge from '@/lib/helpers/getFileRejectionMessage';
import useStore from '@/lib/hooks/useStore';
import Emote, { EmoteValidatorPublishing } from '@/lib/structs/Emote';
import { uploadFile } from '@/lib/helpers/firebase/storage';
import database from '@/lib/helpers/firebase/database';
import StoreEntry from '@/components/StoreEntry';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import analytics from '@/lib/helpers/firebase/analytics';

function PublishStoreContent() {
  const modals = useModals();
  const form = useForm({
    initialValues: {
      thumbnail: null as File | null,
      name: '',
      content: ''
    },
    validate: {
      content: (value) => {
        try {
          return !JSON.parse(value)?.some((val: Emote) => EmoteValidatorPublishing.isValidSync(val)) && 'Invalid emote content';
        } catch {
          return 'Invalid JSON';
        }
      },
      name: (value) => !value && 'Name must not be empty',
      thumbnail: (value: File | null) => (!value || !(value instanceof File)) && 'Thumbnail must not be empty',
    },
    transformValues: (values) => ({
      ...values,
      content: JSON.parse(values.content).map((val: Emote) => pick(val, ['name', 'file']))
    })
  });

  const showRejectionNotification = (rejection: FileRejection) => {
    showNotification({
      title: <Twemoji>Error ❌</Twemoji>,
      message: getFileRejectionMessasge(rejection.errors[0].code),
      color: 'red',
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    if (!values.thumbnail) return;

    showNotification({
      id: 'publishing',
      title: <Twemoji>📤 Publishing</Twemoji>,
      loading: true,
      color: 'yellow',
      message: 'Please wait...',
      autoClose: false,
    });

    const id = nanoid();
    const ext = values.thumbnail.name.split('.').pop();

    const thumbPath = `thumbnails/${id}.${ext}`;
    await uploadFile(values.thumbnail, thumbPath);

    await set(ref(database, `store/${id}`), {
      ...values,
      id,
      thumbnail: `${id}.${ext}`,
    });

    updateNotification({
      id: 'publishing',
      message: 'Published!',
      title: <Twemoji>✅ Published</Twemoji>,
      color: 'teal',
      loading: false,
      autoClose: 3000
    });

    modals.closeModal('publish-store');
  });

  return (
    <section>
      <form onSubmit={onSubmit}>
        <Input.Wrapper required label="Thumbnail" classNames={{ label: 'mb-1', root: 'mb-3' }}>
          <Dropzone onDrop={(files) => form.setFieldValue('thumbnail', files[0])} onReject={(rejections) => showRejectionNotification(rejections[0])} />
        </Input.Wrapper>

        <TextInput required label="Name" classNames={{ label: 'mb-1', root: 'mb-3' }} {...form.getInputProps('name')} />

        <Textarea required label="Content" classNames={{ label: 'mb-1', root: 'mb-5' }} {...form.getInputProps('content')} />

        <section className="flex justify-end gap-3">
          <Button color="violet" type="submit">Publish</Button>
        </section>
      </form>
    </section>
  );
}

export default function Store() {
  const user = useUser((s) => s.uid);
  const { items, loading } = useStore();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: 'store',
      page_path: '/store',
    });
  }, []);

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
        <section className="w-full flex justify-end mb-6">
          <Button onClick={openPublishModal} leftIcon={<Twemoji>☁️</Twemoji>}>Publish</Button>
        </section>
      )}

      {loading && <Loading />}
      {!loading && !items.length && <NotFound />}
      {!loading && !!items.length && (
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
          {items.map((item) => <StoreEntry {...item} key={item.id} />)}
        </section>
      )}
    </Layout>
  );
}