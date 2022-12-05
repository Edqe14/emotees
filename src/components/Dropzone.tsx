import { Image, Text } from '@mantine/core';
import { Dropzone as MantineDropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';

export default function Dropzone({ onDrop, ...props }: Partial<DropzoneProps>) {
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!preview) return setPreviewUrl(null);

    const url = URL.createObjectURL(preview);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [preview]);

  const internalOnDrop = (acceptedFiles: File[]) => {
    setPreview(acceptedFiles[0]);
    onDrop?.(acceptedFiles);
  };

  return (
    <MantineDropzone
      onDrop={internalOnDrop}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      {previewUrl && (
        <Image src={previewUrl} withPlaceholder />
      )}

      {!previewUrl && (
        <section className="flex justify-center items-center my-8 w-full h-full">
          <section className="mr-3">
            <MantineDropzone.Accept>
              <IconUpload
                size={50}
                stroke={1.5}
              />
            </MantineDropzone.Accept>

            <MantineDropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
              />
            </MantineDropzone.Reject>

            <MantineDropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </MantineDropzone.Idle>
          </section>

          <section>
            <Text size="xl" inline>
            Drag images here or click to select files
            </Text>

            <Text size="sm" color="dimmed" inline mt={7}>
            Attach one image, the file should not exceed 5mb
            </Text>
          </section>
        </section>
      )}
    </MantineDropzone>
  );
}