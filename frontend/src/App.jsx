import { Routes, Route } from "react-router-dom";

Routes

function App() {
  return (
    <>
      <h1>React Hoot</h1>
      <Routes>
        <Route path="/test" element={<h1>Test</h1>} ></Route>
      </Routes>
    </>
  );
}

export default App;``