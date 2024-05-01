"use server";

const data = {
  isLiked: false,
  likeCount: 0,
};

export async function toogleLike() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  data.isLiked = !data.isLiked;
  data.likeCount = data.likeCount + 1;
  console.log("data", data);

  return data;
}

export async function getLikeStatus() {
  return data;
}
