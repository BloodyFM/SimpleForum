import React, { useContext } from "react";
import { Form } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import Card from "../UI/Card";
import style from "./NewCommentForm.module.css";

const NewCommentForm: React.FC<{ id: string }> = ({ id }) => {
  const { username } = useContext(AuthContext);
  return (
    <Form action={`/${id}`} method="post">
      <Card className={style.theform}>
        <input
          name="comment-author"
          id="comment-author"
          type="hidden"
          value={username}
        />
        <div className={style.inputfield}>
          <label htmlFor="comment-text">Write a comment!</label>
          <br />
          <div className={style.inputsubmit}>
            <textarea name="comment-text" id="comment-text" required/>
            <button>Add Comment</button>
          </div>
        </div>
      </Card>
    </Form>
  );
};

export default NewCommentForm;
