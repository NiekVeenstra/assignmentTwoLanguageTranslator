import { useState } from "react";
import { useForm } from "react-hook-form";
import { translationAdd } from "../api/translation";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const TranslationPage = () => {
  const { register, handleSubmit } = useForm();

  const { user, setUser } = useUser();

  const onSubmit = async ({ translations }) => {
    const [error, result] = await translationAdd(user, translations);

    if (error !== null) {
      return;
    }

    storageSave(STORAGE_KEY_USER, result);
    setUser(result);

    console.log("error", error);
    console.log("result", result);

    createTranslation(translations);
  };

const [split, setSplit] = useState([]);


  const createTranslation =  (translation) => {
    console.log(translation);
    const split = translation.split("")
    console.log(split);
    setSplit(split);
    
  }


  return (
    <div>
      TranslationPage
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="translation-request">translation-request:</label>
          <input type="text" {...register("translations")} />
        </fieldset>
        <button style={{ border: "solid black 1px" }} type="submit">
          translate
        </button>
        {split.map((x, index)=> 
          <img key={index} src={`img/${x}.png`} alt="" />
          )}
      </form>
    </div>
  );
};

export default withAuth(TranslationPage);
