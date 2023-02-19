import { useForm } from "react-hook-form";
import { translationAdd } from "../api/translation";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

const TranslationPage = () => {
  const { register, handleSubmit } = useForm();

  const { user } = useUser();

  const onSubmit = async ({ translations }) => {
    //console.log(translations);

    const [error, result] = await translationAdd(user, translations);

    //console.log("error", error);
    //console.log("result", result);
  };

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
      </form>
    </div>
  );
};

export default withAuth(TranslationPage);
