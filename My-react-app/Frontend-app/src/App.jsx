import { useState } from "react";
// import "./App.css";

function App() {
  const [Data1, SetData1] = useState("");

  fetch("http://localhost:8000/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      SetData1(data.msg);
    });
  return (<>
  <h1>{Data1}</h1>
  </>);
}

export default App;
