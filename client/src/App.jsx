import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WelcomePage from "./pages/WelcomePage"
import TodoList from "./pages/TodoList"

function App() {

  return (
    <Router>

      <div className='min-h-screen w-screen text-zinc-100 bg-zinc-900'>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
