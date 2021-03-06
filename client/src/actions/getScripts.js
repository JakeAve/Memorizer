const getScripts = async (token) => {
  try {
    const response = await fetch("/api/scripts", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) return { success: true, data: result };
    else return { success: false, data: [] };
  } catch (err) {
    console.error(err);
    window.alert("An unexpected error has occured");
  }
};

export default getScripts;
