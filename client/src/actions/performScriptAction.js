export const scriptActions = {
  memorize: "memorize",
  practice: "practice",
  forget: "forget",
};

const performScriptAction = async (token, action, id) => {
  try {
    const response = await fetch(`/api/script/${action}/${id}`, {
      method: "PUT",
      headers: {
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

export default performScriptAction;
