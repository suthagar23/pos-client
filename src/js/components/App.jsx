// src/js/components/App.jsx
import React from "react";
import List from "./ListComponent/List.jsx"
import Form from "./FromComponent/Form.jsx"
const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
        <List />
    </div>
     <div className="col-md-4 offset-md-1">
      <h2>Add a new article</h2>
      <Form />
    </div>
  </div>
);
export default App;