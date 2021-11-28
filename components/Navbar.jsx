/* eslint-disable */
import { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [value, setValue] = useState();

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: "5vh" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            lyricfinder
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  href="https://github.com/renzynx/lyricfinder"
                >
                  Source
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Type a song name here..."
                aria-label="Search"
                onChange={onChange}
                value={value}
              />
              <Link href={value ? `/result?q=${value}` : "/"} passHref={true}>
                <button className="btn btn-outline-danger" type="submit">
                  Search
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
