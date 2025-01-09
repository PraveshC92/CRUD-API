import { useNavigate } from "react-router-dom";

const Home = () => {
  const router = new useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() => {
          router("/Users");
        }}
      >
        Go to Users Page
      </button>
    </div>
  );
};

export default Home;
