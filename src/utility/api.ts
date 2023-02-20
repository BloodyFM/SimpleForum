type PostData = {
  text: string;
  img: string;
  author: string;
};

export type CommentData = {
  id: string;
  data: { text: string; author: string };
  postId: string;
};

export async function savePost(postData: PostData) {
  console.log(postData);

  // remember .json at the end
  const response = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forum.json",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw response;
  }
}

export async function getPosts() {
  const response = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forum.json"
  );
  if (!response.ok) {
    throw new Response("Failed to fetch posts.", { status: 500 });
  }
  return response.json();
}

export async function getPost(id: string) {
  return fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forum/" +
      id +
      ".json"
  );
  // should add .json ?
}

export const saveComment = async (commentData: CommentData) => {
  const response = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forumComments.json",
    {
      method: "POST",
      body: JSON.stringify({
        data: { text: commentData.data.text, author: commentData.data.author },
        quoteId: commentData.postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw response;
  }
};

export const getComments = async (postId: string) => {
  const response = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forumComments.json"
  );
  if (!response.ok) {
    throw new Response("Failed to fetch comments.", { status: 500 });
  }
  const commentData = await response.json();
  // filter out comments based on postId and arranging it in a more usable format
  const loadedComments: CommentData[] = [];
  for (const key in commentData) {
    if (commentData[key].quoteId === postId) {
      loadedComments.push({
        id: key.toString(),
        data: {
          text: commentData[key].data.text,
          author: commentData[key].data.author,
        },
        postId: commentData[key].postId,
      });
    }
  }

  return loadedComments;
};

type AuthData = {
  username: string;
  email: string;
  password: string;
};

export const createUser = async (userData: AuthData) => {
  // step 1 make sure the username is unique
  const responseCheckUsername = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forumUsers.json"
  );
  if (!responseCheckUsername.ok) {
    throw new Response("Failed to fetch usernames.");
  }
  const usernameData = await responseCheckUsername.json();
  for (const key in usernameData) {
    if (usernameData[key].username === userData.username) {
      throw new Response("Username is taken.");
    }
  }

  // step 2 if unique create user
  const data = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmYZ3TihDNJ_5ujmQ_HHAveX39pYL3sdw",
    {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Response("Could not register user");
    }
  });
  const { localId, idToken } = data;

  // step 3 upload username with userId as identifier
  const responsePostUsername = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forumUsers.json",
    {
      method: "POST",
      body: JSON.stringify({
        id: localId,
        username: userData.username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!responsePostUsername.ok) {
    throw responsePostUsername;
  }
  return idToken;
};

type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginData) => {
  // step 1 login to get token and UID
  const data = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmYZ3TihDNJ_5ujmQ_HHAveX39pYL3sdw",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Response("Could not login user");
    }
  });
  const { localId, idToken } = data;

  // step 2 use UID to grab username from database
  const responseGetUsername = await fetch(
    "https://react-http-test-af027-default-rtdb.europe-west1.firebasedatabase.app/forumUsers.json"
  );
  if (!responseGetUsername.ok) {
    throw new Response("Failed to fetch usernames.");
  }
  const usernameData = await responseGetUsername.json();
  let username = "";
  for (const key in usernameData) {
    if (usernameData[key].id === localId) {
      username = usernameData[key].username;
    }
  }
  if (username === "") {
    throw new Response("Failed to find username");
  }

  return { token: idToken, username };
};
