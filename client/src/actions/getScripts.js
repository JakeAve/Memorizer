const getScripts = async (token) => {
  try {
    const response = await fetch("/api/scripts", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    ///////
    // return {
    //   success: true,
    //   data: [
    //     {
    //       _id: "1",
    //       content: "abcdeft, asf jasdfu jasdfu uasdf jsdfu jsduf",
    //       memorized: false,
    //       lastPracticed: new Date("june 3, 2021"),
    //     },
    //     {
    //       _id: "2",

    //       content: "other script blah bla bla bla",
    //       memorized: true,
    //       lastPracticed: new Date("may 23, 2021"),
    //     },
    //     {
    //       _id: "3",

    //       content: "third script something",
    //       memorized: true,
    //       lastPracticed: new Date("june 2, 2021"),
    //     },
    //   ],
    // };
    const result = await response.json();
    if (response.ok) return { success: true, data: result };
    else return { success: false, data: [] };
  } catch (err) {
    console.error(err);
    window.alert("An unexpected error has occured");
  }
};

export default getScripts;
