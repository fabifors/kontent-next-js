import { gql } from '@apollo/client';
import Head from 'next/head'
import client from "../lib/apollo-client";
import styles from '../styles/Home.module.css';

export default function Home({ blogPage, blogPosts }) {
  return (
    <div className="layout">
      <Head>
        <title>Blog Testing Kontent.ai</title>
      </Head>
      <div className="container hero">
        <h1 className={`title ${styles["hero-title"]}`}>{blogPage._pageHero?.title}</h1>
        <p className="description">{blogPage._pageHero?.description}</p>
        {blogPage._pageHero?.label && (
          <div className={`button ${styles["hero-button"]}`}>
            <a href="#">{blogPage._pageHero?.label}</a>
          </div>
        )}
      </div>
      <section className="container">
        <h2 className={styles["section-title"]}>Recent posts</h2>
        <ul className={styles.list}>
          {Array.isArray(blogPosts) ? blogPosts.map((post, index) => {
            return (
              <li key={post.title + index}>
                <a href={`http://localhost:3000/${post.slug}`} >{post.title}</a>
              </li>
            )
          }) : (<h3>No posts avaliable</h3>)}
        </ul>
      </section>
    </div >
  )
}

export async function getStaticProps() {
  const { data: { blogPost_All } } = await client.query({
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

  const { data: { blogPage_All } } = await client.query({
    variables: {
      languageFilter: {
        languageCodename: "International"
      }
    },
    query: gql`
      query BlogPage($languageFilter: _LanguageFilter) {
        blogPage_All(languageFilter: $languageFilter) {
          items {
            slug
            _pageHero {
              title
              description
              label
            }
          }
        }
      }
    `
  })

  const [blogPage] = blogPage_All.items;

  const blogPosts = blogPost_All.items;

  return {
    props: { blogPage, blogPosts },
  };
}