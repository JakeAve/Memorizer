import getUserInfo from "../actions/getUserInfo";
import refreshToken from "../actions/refreshToken";
import { useHistory } from "react-router";
import logoutUser from "../actions/logoutUser";
import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState(null);

  const history = useHistory();

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      setAccessToken(null);

      const openRoutes = ["/login", "/register"];
      if (!openRoutes.includes(history.location.pathname))
        history.push("/login");
    }
  };

  const renewToken = async () => {
    try {
      const { success, data } = await refreshToken();
      if (success && data.accessToken) setAccessToken(data.accessToken);
      else throw new Error("Could not refresh token");
      const { success: userSuccess, data: userData } = await getUserInfo(
        data.accessToken
      );
      if (userSuccess) setUser(userData);
      else throw new Error("Could not find user");
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  useEffect(() => {
    renewToken();
    setInterval(() => {
      renewToken();
    }, 14 * 60 * 1000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, setAccessToken, accessToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
