export async function getStaticProps() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return {
    props: {
      posts,
      categories,
    },
  };
}