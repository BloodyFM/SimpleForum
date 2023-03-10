import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import { CommentData, getComments, getUsernames } from "../../utility/api";
import Comment from "./Comment";
import NewCommentForm from "../Forms/NewCommentForm";
import { AuthContext } from "../../store/auth-context";
import style from "./Comments.module.css";

const Comments: React.FC<{}> = () => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const params: any = useParams();
  const id: string = params.id;
  const location = useLocation();

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const grabData = async () => {
      const data: CommentData[] = await getComments(id);
      const users = await getUsernames();
      for (const key in data) {
        for (const x in users) {
          if (data[key].data.author === users[x].UID) {
            data[key].data.author = users[x].username;
          }
        }
      }
      setCommentData(data);
    };
    grabData();

    const refreshComments = setInterval(() => {
      grabData();
    }, 3000);
    return () => clearInterval(refreshComments);
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
    <section className={style.comments}>
      {isLoggedIn ? (
        <NewCommentForm id={id} />
      ) : (
        <p>Must be logged in to post a comment</p>
      )}
      <ul>{commentList}</ul>
    </section>
  );
};

export default Comments;
