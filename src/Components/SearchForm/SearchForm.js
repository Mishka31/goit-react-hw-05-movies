import { useState } from "react";

const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const reset = () => {
    setValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim() === "") {
      return alert("Пустое поле");
    }
    onSubmit(value);
    reset();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <h1>Search Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={value} placeholder="Enter a movie name" />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchForm;
