import getUserInfo from "../actions/getUserInfo";
import refreshToken from "../actions/refreshToken";
import { useHistory } from "react-router";

const { useContext, createContext, useState, useEffect } = require("react");

const UserContext = createContext(null);

const foo = {
  firstName: "Test",
  lastName: "test",
};

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState(null); ///////// set null

  const history = useHistory();

  const renewToken = async () => {
    try {
      const { success, data } = await refreshToken();
      if (success && data.accessToken) setAccessToken(data.accessToken);
      const { success: userSuccess, data: userData } = await getUserInfo(
        data.accessToken
      );
      if (userSuccess) setUser(userData);
    } catch (err) {
      setUser(null); /////////// set null
    }
  };

  useEffect(() => {
    renewToken();
    setInterval(() => {
      renewToken();
    }, 14 * 60 * 1000);
  }, []);

  useEffect(() => {
    setUser(user);
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <UserContext.Provider
      value={{ user, setUser, setAccessToken, accessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
