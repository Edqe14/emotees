import { Accordion, ActionIcon, Kbd, List, Text } from '@mantine/core';
import { Icon3dCubeSphere, IconPlus } from '@tabler/icons';
import Twemoji from './Twemoji';
import getOSModKey from '@/lib/helpers/getOSModKey';

export default function HelpMenu(){
  return (
    <Accordion
      defaultValue="getting-started"
      classNames={{
        label: 'font-semibold',
        panel: 'leading-8'
      }}
    >
      <Accordion.Item value="getting-started">
        <Accordion.Control>
          <Twemoji>🚀 Getting Started</Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          <Twemoji>
            👋 Hey there! Welcome to Emotees, the only custom emote clipboard for Discord you need <img src="https://cdn.discordapp.com/emojis/580791248554819586.webp?size=48&quality=lossless" className="inline mx-1 align-sub" width={24} />. Before we continue, this website is <span className="font-semibold">open-sourced</span>! You can find the source code on <a href="https://github.com/Edqe14/Emotees" target="_blank" rel="noreferrer" className="text-blue-500">GitHub</a>.
          </Twemoji>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="features">
        <Accordion.Control>
          <Twemoji>🌸 Features</Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          <List type="ordered" icon={<Icon3dCubeSphere size={16} />} classNames={{ itemWrapper: 'flex items-center', itemIcon: 'text-red-500' }}>
            <List.Item>Click-to-Copy</List.Item>
            <List.Item>Favoriting</List.Item>
            <List.Item>Search & Sort by</List.Item>
            <List.Item>Toggleable theme</List.Item>
            <List.Item>Emote syncing</List.Item>
            <List.Item>Import & Export</List.Item>
            <List.Item>Store</List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="adding-emotes">
        <Accordion.Control>
          <Twemoji>
            📥 Adding Emotes
          </Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          To add a new emote, copy your favorite custom emote link, Ex: <code>https://cdn.discordapp.com/emojis/581598053367021568.gif?size=48&quality=lossless</code>, then click the

          <ActionIcon className="inline-flex align-middle mx-2" color="violet" variant="light" radius="xl">
            <IconPlus size={20} />
          </ActionIcon>

          button on the toolbar below, use the shortcut <Kbd>{getOSModKey()} + Alt + N</Kbd>, or you can just paste the link. After inputing the link, you can edit the emote name before saving.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="emote-sync">
        <Accordion.Control>
          <Twemoji>☁️ Emote Syncing</Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          You can login using <Kbd>Google</Kbd>, <Kbd>Twitter</Kbd>, or <Kbd>Github</Kbd> to enable syncing between devices. This will allow you to access your emotes on any device, powered by <a href="https://firebase.google.com/" target="_blank" rel="noreferrer" className="text-blue-500">Firebase</a>!.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="export-import">
        <Accordion.Control>
          <Twemoji>
            📤 Exporting & Importing
          </Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          <p className="mb-3">You can export your emotes as a <code>.json</code> file, or import emotes from a <code>.json</code> file. This is useful if you want to backup your emotes, or if you want to import emotes from another device with no internet.</p>
          <p>You can do this by opening <Kbd>Manage</Kbd> menu <Text italic className="inline" color="dimmed">(by clicking the avatar icon on the top right part)</Text> and follow the instructions there.</p>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="keybinds">
        <Accordion.Control>
          <Twemoji>⌨️ Keybinds</Twemoji>
        </Accordion.Control>

        <Accordion.Panel>
          <List className="flex flex-col gap-2">
            <List.Item icon={<><Kbd>;</Kbd> or <Kbd>{getOSModKey()} + K</Kbd></>}>
              to search
            </List.Item>

            <List.Item icon={<Kbd>{getOSModKey()} + J</Kbd>}>
              to toggle theme
            </List.Item>

            <List.Item icon={<Kbd>{getOSModKey()} + ,</Kbd>}>
              to open adjustment menu
            </List.Item>

            <List.Item icon={<Kbd>{getOSModKey()} + Alt + N</Kbd>}>
              to add new emote
            </List.Item>

            <List.Item icon={<Kbd>{getOSModKey()} + Alt + F</Kbd>}>
              to toggle favorites only
            </List.Item>

            <List.Item icon={<Kbd>{getOSModKey()} + /</Kbd>}>
              to open this menu
            </List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}