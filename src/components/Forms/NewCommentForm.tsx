import React from "react";
import { Form } from "react-router-dom";

const NewCommentForm: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Form action={`/${id}`} method="post">
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
