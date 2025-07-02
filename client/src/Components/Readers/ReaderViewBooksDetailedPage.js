import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../BaseUrl";

function ReaderViewBooksDetailedPage() {
  const { state } = useLocation();
  const book = state?.book;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (book?.author) {
      fetchRecommendations(book.author);
    }
  }, [book]);

  const fetchRecommendations = async (author) => {
    try {
      const response = await axiosInstance.post("http://localhost:4059/recommend", {
        type: "author",
        query: author,
        top_k: 5
      });
      setRecommendations(response.data.data.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  if (!book) {
    return <h3>No book data received. Please go back and try again.</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      <img src={book.img} alt="cover" style={{ width: "200px" }} />
      <p><strong>Author:</strong> {book.author}</p>

      <h3 className="mt-4">Also read books written by {book.author}</h3>

      <div className="row mt-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={rec.img}
                className="card-img-top"
                alt={rec.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{rec.title}</h5>
                <p className="card-text"><strong>Rating:</strong> {rec.rating}</p>
                <p className="card-text"><strong>Genre:</strong> {rec.genre.split(',').slice(0, 2).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReaderViewBooksDetailedPage;
