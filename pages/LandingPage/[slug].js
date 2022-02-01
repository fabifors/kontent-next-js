import React from 'react';

const LandingPage = (props) => {
  return <div></div>;
};

export default LandingPage;


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query BlogPosts {
        blogPost_All {
          items {
            slug
            title
          }
        }
      }
    `
  })

  return {
    props: { data },
  };
}