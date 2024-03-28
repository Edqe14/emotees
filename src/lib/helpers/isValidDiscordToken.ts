const isValidDiscordToken = async (token: string) => {
  try {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: token,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
};

export default isValidDiscordToken;