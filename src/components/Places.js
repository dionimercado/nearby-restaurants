import React from "react";

export default ({ places }) => {
  return (
    <div>
      <ul className="list-group">
        {places.map(place => (
          <li key={place.id} className="list-group-item">
            {place.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
