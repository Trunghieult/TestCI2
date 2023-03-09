import "./App.css";
import Content from "./component/Content";
import Author from "./component/Author";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((res) => {
        const list = res.results;
        const Rdnum = Math.floor(Math.random() * (list.length - 1)) + 0;
        setData(list);
        setQuote(list[Rdnum].content);
        setAuthor(list[Rdnum].author);
        setId(list[Rdnum]._id);
        setTags(list[Rdnum].tags);
      });
  }, []);

  function fetchNewQuote() {
    fetch("https://api.quotable.io/quotes")
      .then((res) => res.json())
      .then((res) => {
        const list = res.results;
        const Rdnum = Math.floor(Math.random() * (list.length - 1)) + 0;
        setData(list);
        setQuote(list[Rdnum].content);
        setAuthor(list[Rdnum].author);
        setId(list[Rdnum]._id);
        setTags(list[Rdnum].tags);
      });
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Content
              id={id}
              quote={quote}
              author={author}
              tags={tags}
              fetchNewQuote={fetchNewQuote}
            />
          }
        />
        <Route path="/:id" element={<Author data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
