import { Route, Routes } from "react-router-dom";
import StartupPage from "./pages/StartupPage";
import TranslationPage from "./pages/TranslationPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartupPage/>} />
      <Route path="/translation" element={<TranslationPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  );
};

export default App;
