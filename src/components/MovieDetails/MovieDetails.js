import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncDetails,
  getSelectedDetails,
} from "../../features/movies/movieSlice";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { BsCameraReelsFill, BsFillCalendarEventFill } from "react-icons/bs";
import { removeSelectedDetails } from "../../features/movies/movieSlice";

import "./MovieDetails.scss";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedDetails);

  useEffect(() => {
    dispatch(fetchAsyncDetails(id));

    return () => {
      dispatch(removeSelectedDetails());
    };
  }, [dispatch, id]);

  return (
    <div className="movie-section">
      {!data?.Title ? (
        <h4>Loading....</h4>
      ) : (
        <>
          <div className="section-left">
            <div className="section-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <FaStar className="star" /> : {data.imdbVotes}
              </span>
              <span>
                IMDB Votes <FaThumbsUp className="thumb" /> : {data.imdbRating}
              </span>
              <span>
                Runtime <BsCameraReelsFill className="runtime" /> :{" "}
                {data.Runtime}
              </span>
              <span>
                Year <BsFillCalendarEventFill className="calendar" /> :{" "}
                {data.Year}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
