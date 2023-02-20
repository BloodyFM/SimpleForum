import React, { useContext } from "react";
import { Form } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";

const NewCommentForm: React.FC<{ id: string }> = ({ id }) => {
  const { username } = useContext(AuthContext);
  return (
    <Form action={`/${id}`} method="post">
      <input
        name="comment-author"
        id="comment-author"
        type="hidden"
        value={username}
      />
      <div>
        <label htmlFor="comment-text">Write a comment!</label>
        <textarea name="comment-text" id="comment-text" rows={3} />
      </div>
      <div>
        <button>Add Comment</button>
      </div>
    </Form>
  );
};

export default NewCommentForm;
