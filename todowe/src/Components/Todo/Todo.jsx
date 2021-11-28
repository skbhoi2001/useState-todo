//import logo from './logo.svg';
//import './App.css';
import { useEffect, useState } from "react";

function Todo() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  console.log(`inside app`);
  const UserCard = ({ id, name, url, avatar }) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "2rem",
          border: "1px solid black",
          padding: "1rem"
        }}
      >
        <img width="50" src={avatar} alt={id} />
        <div>
          <div>{name}</div>
          <div>{url}</div>
        </div>
      </div>
    );
  };
  const Pagination = ({ totalPages, currentPage, onClickCallback }) => {
    const pages = new Array(totalPages).fill(0).map((a, i) =>
      i + 1 === currentPage ? (
        <button disabled style={{ background: "olive" }} key={i}>
          {i + 1}
        </button>
      ) : (
        <button onClick={() => onClickCallback(i + 1)} key={i}>
          {i + 1}
        </button>
      )
    );
    return <div style={{ display: "flex", gap: "1rem" }}>{pages}</div>;
  };
  const getUsers = ({ query = "masai", page = 1 }) => {
    return fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}`
    ).then((res) => res.json());
  };
  // On Mounting
  useEffect(() => {
    getUsers({
      page
    })
      .then((res) => {
        setData(res);
        if (res.total_count) {
          const totalPages = Math.ceil(res.total_count / 50);
          setTotalPages(totalPages);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  // * EMPTY DEPENDANCY ARRAY
  // if(isLoading){
  //   return <h3>Loading...</h3>
  // }

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div className="App">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {data?.items?.map((user) => (
            <UserCard
              key={user.id}
              id={user.login}
              name={user.login}
              url={user.url}
              avatar={user.avatar_url}
            />
          ))}
          <Pagination
            currentPage={page}
            onClickCallback={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}

export default Todo;