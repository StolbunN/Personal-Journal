import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import styles from "./SelectUser.module.css";

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  }

  return (
    <select name="user" id="user" value={userId} onChange={changeUser} className={styles["select"]}>
      <option value="1">Никита</option>
      <option value="2">Елена</option>
    </select>
  )
}

export default SelectUser