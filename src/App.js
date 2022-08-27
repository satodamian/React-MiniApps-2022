
import { useEffect, useState } from "react";
import { Quote } from "./components/Quote";
import Spinner from "./components/Spinner";
const initialQuote = {
    text: 'Quote',
    author: 'Author',
}

function App() {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);

  // UseEffect no recibe funciones asincornas
  const updateQuotes= async()=>{
    setLoading(true);
    const url = "https://www.breakingbadapi.com/api/quote/random";
    const res = await fetch(url);
    const [newQuote] = await res.json();
    const { quote: text, author } = newQuote;
  
    // nuevo estado del Quote
    setQuote({
      text: text,
      author: author,
    })
      setLoading(false);
  }

  useEffect(() => {
      updateQuotes();
  }, []);

  return (
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />
      <button onClick={()=>updateQuotes()}>Get Another</button>
      {
        loading ? <Spinner/>
              : <Quote quote={quote}/>
      }
      
    </div>
  );
  }

export default App;
