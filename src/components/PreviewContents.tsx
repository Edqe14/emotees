import Emote from "@/lib/structs/Emote";
import EmoteView from "./EmoteView";
import { Tabs } from "@mantine/core";
import { useMemo } from "react";
import NotFound from "./NotFound";

export default function PreviewContents({ emotes }: { emotes: Emote[] }) {
  const emojis = useMemo(() => emotes.filter((e) => !e.isSticker), [emotes]);
  const stickers = useMemo(() => emotes.filter((e) => e.isSticker), [emotes]);

  return (
    <>
      <Tabs defaultValue="emojis">
        <div className="flex mb-4">
          <Tabs.Tab value="emojis">Emojis</Tabs.Tab>
          <Tabs.Tab value="stickers">Stickers</Tabs.Tab>
        </div>

        <Tabs.Panel value="emojis">
          <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-2 justify-center">
            {emojis.map((e) => (
              <EmoteView key={e.name} {...e} />
            ))}
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="stickers">
          {stickers.length === 0 && <NotFound noCTA />}
          {stickers.length > 0 && (
            <section className="grid grid-cols-4 gap-2 justify-center">
              {stickers.map((e) => (
                <EmoteView key={e.name} {...e} />
              ))}
            </section>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
