import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({}) {
  const [active, setActive] = useState("books");
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    Promise.all([axios.get("books"), axios.get("authors")]).then((res) => {
      setBooks(res[0].data);
      setAuthors(res[1].data);
    });
  }, []);
  return (
    <div className="container">
      <nav className="nav nav-tabs">
        <a
          onClick={() => setActive("books")}
          className={`nav-link ${active === "books" ? "active" : ""}`}
          href="#"
        >
          Books
        </a>
        <a
          onClick={() => setActive("authors")}
          className={`nav-link ${active === "authors" ? "active" : ""}`}
          href="#"
        >
          Authors
        </a>
      </nav>
      <div class="row row-cols-sm-2 row-cols-md-4">
        {active === "books" ? (
          <>
            {books.map((book) => (
              <div key={book._id} className=" col card">
                <img src={book.image} style={{width:"200px", height: "200px"}} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    Pages: {book.pages}
                  </p>
                  <Link href={`/books/${book._id}`}>
                    <button  className="m-1 btn btn-primary">View</button> 
                  </Link>
                  <a href="#" className="m-1 btn btn-warning" onClick={() => editBook(book._id)}>
                    Edit
                  </a>
                  <a href="#" className="m-1 btn btn-danger" onClick={() => deleteBook(book._id)}>
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}