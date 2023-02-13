type PostData = {
  text: string;
  img: string;
  author: string;
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
