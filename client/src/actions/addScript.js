const addScript = async (data, token) => {
  try {
    const response = await fetch("/api/script", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (response.ok) return { success: true, data: result };
    else return { success: false, data: result };
  } catch (err) {
    console.error(err);
    window.alert("An unexpected error has occured");
  }
};

export default addScript;
