import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./components/header"
import { HomeScreen } from "./pages/home-screen"
import ProjectsScreen from "./pages/projects"
import { Footer } from "./components/footer"


function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/projects" element={<ProjectsScreen />} />
        </Routes>
        <Header />
        <Footer />
      </BrowserRouter>

  )
}

export default App
