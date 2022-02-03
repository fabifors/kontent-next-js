import React from 'react';
import BlockStyles from './BlogPostsBlock.module.css'

const BlogPostsBlock = ({ data }) => {
  const { blogPosts } = data;
  return (
    <section className="container">
      <h2 className={BlockStyles.title}>Recent posts</h2>
      <ul className={BlockStyles.list}>
        {Array.isArray(blogPosts) ? blogPosts.map((post, index) => {
          return (
            <li key={post.title + index}>
              <a href={`http://localhost:3000/${post.slug}`} >{post.title}</a>
            </li>
          )
        }) : (
          <li className={BlockStyles["list-no-items"]}>
            <p>No posts avaliable</p>
          </li>
        )}
      </ul>
    </section>
  );
};

export default BlogPostsBlock;
