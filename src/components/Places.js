import React from "react";
import StarRatings from "react-star-ratings";

export default ({ places, onChangeRating, filter }) => {
  return (
    <div style={{ height: "calc(100vh - 56px)", overflow: "auto" }}>
      <ul className="list-group">
        <li
          className="list-group-item active rounded-0 position-fixed w-25"
          style={{
            right: 0,
            top: 0
          }}
        >
          <h4 className="mb-0 d-flex justify-content-between">
            <span>Nearby Places</span>
            <StarRatings
              rating={filter}
              numberOfStars={5}
              changeRating={rating => onChangeRating(rating)}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="3px"
            />
          </h4>
        </li>
        {places.map(place => (
          <li key={place.id} className="list-group-item">
            <h5>{place.name}</h5>
            <div>
              <span
                className="badge badge-secondary position-relative mr-2"
                style={{ bottom: "-3px" }}
              >
                {(place.rating * 1).toFixed(1)}
              </span>
              <StarRatings
                rating={place.rating}
                numberOfStars={5}
                starRatedColor="orange"
                starDimension="20px"
                starSpacing="3px"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
