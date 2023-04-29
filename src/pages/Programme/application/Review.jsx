import React from "react";
import Button from "../../../components/Button";

function Review() {
  let data = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      review: "This is a great review",
      document: [
        {
          rating: 5,
          review: "This is a great review",
        },
        {
          rating: 6,
          review: "This is a great review",
        },
      ],
    },
  ];
  return (
    <div>
      <h3>Review and submit</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{++index}</td>
              <td>{item.name}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              <td>
                {item.document.map((item) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{item.rating}</span>
                    <span>{item.review}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        style={{
          width: 200,
          marginLeft: "auto",
          marginTop: 20,
        }}
        onClick={() => {
          console.log("submitted");
        }}
        label="Submit"
      />
    </div>
  );
}

export default Review;
