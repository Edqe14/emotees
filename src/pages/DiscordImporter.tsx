import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { Button, Loader } from "@mantine/core";
import Layout from "@/components/Layout";
import useUser from "@/lib/hooks/useUser";
import { fromDiscord } from "@/lib/helpers/import";
import StoreEntry from "@/components/StoreEntry";
import getIconUrl from "@/lib/helpers/getIconUrl";
import Emote from "@/lib/structs/Emote";
import isValidDiscordToken from "@/lib/helpers/isValidDiscordToken";

type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
};

type RawEmoji = {
  id: string;
  name: string;
  roles?: any[];
  user?: any;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
};

const StickerType = {
  STANDARD: 1,
  GUILD: 2,
} as const;

const StickerFormat = {
  PNG: 1,
  APNG: 2,
  LOTTIE: 3,
  GIF: 4,
} as const;

type RawSticker = {
  id: string;
  name: string;
  tags: string;
  type: (typeof StickerType)[keyof typeof StickerType];
  format_type: (typeof StickerFormat)[keyof typeof StickerFormat];
  available?: boolean;
  guild_id?: string;
  sort_value?: number;
};

const fetchGuilds = async (token: string) => {
  try {
    const response = await fetch(
      "https://discord.com/api/v10/users/@me/guilds",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.json() as Promise<Guild[]>;
  } catch {
    return null;
  }
};

const fetchEmojis = async (token: string, guildId: string) => {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/emojis`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.json() as Promise<RawEmoji[]>;
  } catch {
    return null;
  }
};

const fetchStickers = async (token: string, guildId: string) => {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/stickers`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.json() as Promise<RawSticker[]>;
  } catch {
    return null;
  }
};

const getStickerFormat = (
  format: (typeof StickerFormat)[keyof typeof StickerFormat]
) => {
  switch (format) {
    case StickerFormat.PNG:
      return "png";
    case StickerFormat.APNG:
      return "png";
    case StickerFormat.LOTTIE:
      return "json";
    case StickerFormat.GIF:
      return "gif";
    default:
      return "webp";
  }
};

const fetchAndFormatStickers = async (token: string, guildId: string) => {
  const stickers = await fetchStickers(token, guildId);

  if (!stickers) {
    showNotification({
      title: "Error",
      message: "Failed to fetch stickers from Discord.",
      color: "red",
    });

    return [];
  }

  return stickers.map(
    (e) =>
      ({
        name: e.name,
        addedAt: Date.now(),
        favorite: false,
        totalUses: 0,
        file: `${e.id}.${getStickerFormat(e.format_type)}`,
        isSticker: true,
        animated:
          e.format_type === StickerFormat.GIF ||
          e.format_type === StickerFormat.APNG,
      } as Emote)
  );
};

const fetchAndFormatEmojis = async (token: string, guildId: string) => {
  const emojis = await fetchEmojis(token, guildId);

  if (!emojis) {
    showNotification({
      title: "Error",
      message: "Failed to fetch emojis from Discord.",
      color: "red",
    });

    return [];
  }

  return emojis.map(
    (e) =>
      ({
        name: e.name,
        addedAt: Date.now(),
        favorite: false,
        totalUses: 0,
        file: `${e.id}.${e.animated ? "gif" : "png"}`,
      } as Emote)
  );
};

const wrapFetchAndFormat = (token: string, guildId: string) => async () => {
  const [emojis, stickers] = await Promise.all([
    fetchAndFormatEmojis(token, guildId),
    fetchAndFormatStickers(token, guildId),
  ]);

  return [...emojis, ...stickers];
};

export default function DiscordImporter() {
  const navigate = useNavigate();
  const token = useUser((s) => s.discordToken);
  const [guilds, setGuilds] = useState<Guild[]>([]);

  const loading = guilds.length === 0;

  useEffect(() => {
    const get = async () => {
      const savedToken = localStorage.getItem("distok");

      if (savedToken && !token) {
        const valid = await isValidDiscordToken(savedToken);

        if (!valid) {
          localStorage.removeItem("distok");
          return fromDiscord(navigate);
        }

        useUser.setState({ discordToken: savedToken });
        return;
      }

      if (!token) {
        return fromDiscord(navigate);
      }

      const guild = await fetchGuilds(token);

      if (!guild) {
        return showNotification({
          title: "Error",
          message: "Failed to fetch guilds from Discord.",
          color: "red",
        });
      }

      setGuilds(guild);
    };

    get();
  }, [token]);

  return (
    <Layout className="flex flex-col">
      <div className="flex gap-4 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Discord Importer</h1>
        <Button onClick={() => fromDiscord(navigate, true)}>
          Change Token
        </Button>
      </div>

      <section className="relative flex-grow">
        {loading && (
          <Loader className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}

        {!loading && !!guilds.length && (
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
            {guilds.map((item) => (
              <StoreEntry
                id={item.id}
                content={wrapFetchAndFormat(token!, item.id)}
                name={item.name}
                thumbnail={getIconUrl(item.id, item.icon)}
                thumbUrl={getIconUrl(item.id, item.icon)}
                key={item.id}
              />
            ))}
          </section>
        )}
      </section>
    </Layout>
  );
}
