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
