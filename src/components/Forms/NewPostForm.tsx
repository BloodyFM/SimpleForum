import React, { useContext } from "react";
import { Form } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const NewPostForm = () => {
  const { username } = useContext(AuthContext);

  return (
    <Form action="/newpost" method="post">
      <input
        name="post-author"
        id="post-author"
        type="hidden"
        value={username}
      />
      <fieldset>
        <label htmlFor="post-text">Write a post!</label>
        <textarea
          id="post-text"
          name="post-text"
          required
          minLength={1}
          rows={5}
        ></textarea>
      </fieldset>
      <fieldset>
        <label htmlFor="post-img">Insert image url (optional)</label>
        <input id="post-img" name="post-img" />
      </fieldset>
      <button>Submitt post</button>
    </Form>
  );
};

export default NewPostForm;
