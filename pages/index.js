import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client';
import client from "../lib/apollo-client";

export default function Home({ data }) {
  const { blogPost_All: { items } } = data;
  return (
    <main >
      <div className={styles.hero}>
        <h1 className="append-dot">Hello, world</h1>
      </div>
      <ul className="blog-post-list">
        {Array.isArray(items) ? items.map((item, index) => {
          return (
            <li key={item.title + index}>{item.title}</li>
          )
        }) : (<h3>No posts avaliable</h3>)}
      </ul>
    </main>
  )
}


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