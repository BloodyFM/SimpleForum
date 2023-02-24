import React, { useContext } from "react";
import { Form } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Card from "../UI/Card";

import style from "./NewPostForm.module.css";

const NewPostForm = () => {
  const { UID } = useContext(AuthContext);

  return (
    <Form action="/newpost" method="post" className={style.form}>
      <Card className={style.formcontent}>
        <input
          name="post-author"
          id="post-author"
          type="hidden"
          value={UID}
        />
        <div>
          <label htmlFor="post-text">Write a post!</label>
          <br />
          <textarea
            id="post-text"
            name="post-text"
            required
            minLength={1}
            rows={5}
          ></textarea>
        </div>
        <div>
          <label htmlFor="post-img">Insert image url (optional)</label>
          <br />
          <input id="post-img" name="post-img" />
        </div>
        <button>Submitt post</button>
      </Card>
    </Form>
  );
};

export default NewPostForm;
