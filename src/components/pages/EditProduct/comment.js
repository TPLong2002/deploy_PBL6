import { useEffect, useState } from "react";
import getCommentById from "../../../services/axios/getCommentById";
import StarRating from "../../../services/other/rating";

function Comment({ productId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentById(productId).then((res) => {
      console.log(res.data);
      setComments(res.data);
    });
  }, []);
  return (
    <div className="space-y-5">
      {comments.map((comment, index) => (
        <div className="flex border" key={index}>
          <div className="w-1/12">
            <img src={comment.participantDto.image}></img>
          </div>
          <div className="flex flex-col w-full">
            <div>
              {comment.participantDto.firstName}{" "}
              {comment.participantDto.lastName}
            </div>
            <div>
              <StarRating rating={comment.rating} />
            </div>
            <div>{comment.time}</div>
            <div className="mt-5 border w-full">{comment.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
