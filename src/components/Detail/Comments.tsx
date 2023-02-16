import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CommentData, getComments } from "../../utility/api";
import Comment from "./Comment";

const Comments: React.FC<{}> = () => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const params: any = useParams();
  const id: string = params.id;

  useEffect(() => {
    const grabData = async () => {
      const data: CommentData[] = await getComments(id);
      setCommentData(data);
    };
    grabData();
  }, [id]);

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
    <section>
      <ul>
        {commentList}
        <Comment text="comment1" author="Test" />
        <Comment text="comment2" author="Test2" />
      </ul>
    </section>
  );
};

export default Comments;
