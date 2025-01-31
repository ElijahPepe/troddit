const PostTitle = ({ post }) => {
  return (
    <h1
      className={
        " group-hover:underline " +
        (post?.distinguished == "moderator" || post?.stickied
          ? " text-lightGreen dark:text-darkGreen "
          : " ")
      }
    >
      {`${post?.title ?? ""}`}
    </h1>
  );
};

export default PostTitle;
