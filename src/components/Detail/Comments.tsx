import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CommentData, getComments } from "../../utility/api";
import Comment from "./Comment";
import NewCommentForm from "../Forms/NewCommentForm";

const Comments: React.FC<{}> = () => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const params: any = useParams();
  const id: string = params.id;
  const location = useLocation();

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
      <NewCommentForm id={id} />
      <section>
        <ul>{commentList}</ul>
      </section>
    </>
  );
};

export default Comments;
