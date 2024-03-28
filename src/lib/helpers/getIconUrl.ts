const getIconUrl = (id: string, name: string) => {
  if (!name) return `https://api.dicebear.com/8.x/shapes/svg?seed=${id}`;

  const ext = name.startsWith('a_')
    ? 'gif'
    : 'webp';

  return `https://cdn.discordapp.com/icons/${id}/${name}.${ext}?size=512`;
};

export default getIconUrl;