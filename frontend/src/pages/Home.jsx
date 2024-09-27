import React from "react";

const Home = () => {
  return (
    <div id="home">
      <main className="content-wrapper">
        <h1>shipping corner</h1>
        <div className="search">
          <form action="/search-user" className="track-form" method="POST">
            <input
              type="text"
              placeholder="Enter shipment id"
              name="search-user"
            />
            <button className="btn btn-search">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                className="search-icon"
              >
                <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"></path>
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
