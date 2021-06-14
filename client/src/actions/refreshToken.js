const refreshToken = async () => {
  try {
    const response = await fetch("/auth/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.ok) return { success: true, data: result };
    else throw new Error("Could not refresh token");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default refreshToken;
