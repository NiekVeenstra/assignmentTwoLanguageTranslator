import { useEffect } from "react";
import { orderClearHistory } from "../api/translation";
import { userById } from "../api/user";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const ProfilePage = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const findUser = async () => {
      const [error, latestUser] = await userById(user.id);
      if (error === null) {
        storageSave(STORAGE_KEY_USER, latestUser);
        setUser(latestUser);
      }
    };

    findUser();
  }, [setUser, user.id]);

  const handleClearHistoryClick = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    const [clearError] = await orderClearHistory(user.id);

    if (clearError !== null) {
      return;
    }

    const upatedUser = {
      ...user,
      translations: [],
    };

    storageSave(STORAGE_KEY_USER, upatedUser);
    setUser(upatedUser);
  };

  return (
    <div>
      ProfilePage
      <h1>hello {user.username}</h1>
      {user.translations.slice(-10).map((translation, index) => {

        return <p key={index}>{translation}</p>;
      })}
      <button onClick={handleClearHistoryClick}>Clear History</button>
    </div>
  );
};

export default withAuth(ProfilePage);
