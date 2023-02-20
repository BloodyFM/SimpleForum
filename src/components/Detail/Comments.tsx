import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CommentData, getComments } from "../../utility/api";
import Comment from "./Comment";
import NewCommentForm from "../Forms/NewCommentForm";
import { AuthContext } from "../../store/auth-context";

const Comments: React.FC<{}> = () => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const params: any = useParams();
  const id: string = params.id;
  const location = useLocation();

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const grabData = async () => {
      const data: CommentData[] = await getComments(id);
      setCommentData(data);
    };
    grabData();
  }, [id, location]);

  let commentList: any = <p>No Comments</p>;
  if (commentData.length > 0) {
    commentList = commentData.map((comment: CommentData) => (
      <Comment
        key={comment.id}
        text={comment.data.text}
        author={comment.data.author}
      />
    ));
  }

  return (
    <>
      {isLoggedIn ? (
        <NewCommentForm id={id} />
      ) : (
        <p>Must be logged in to post a comment</p>
      )}
      <section>
        <ul>{commentList}</ul>
      </section>
    </>
  );
};

export default Comments;
