import { gql } from '@apollo/client';
import client from "../lib/apollo-client";

export default function Home({ blogPage, blogPosts }) {
  return (
    <div>
      <div className="container hero">
        <h1 className="title">{blogPage._pageHero?.title}</h1>
        <p className="description">{blogPage._pageHero?.description}</p>
        {blogPage._pageHero?.label && (
          <div className="button">
            <a href="#">{blogPage._pageHero?.label}</a>
          </div>
        )}
      </div>
      <div className="container">

        <ul className="list">
          {Array.isArray(blogPosts) ? blogPosts.map((post, index) => {
            return (
              <li>
                <a href={`http://localhost:3000/${post.slug}`} key={post.title + index}>{post.title}</a>
              </li>
            )
          }) : (<h3>No posts avaliable</h3>)}
        </ul>
      </div>
    </div>
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

  const [blogPage] = blogPage_All.items
  const blogPosts = blogPost_All.items;

  return {
    props: { blogPage, blogPosts },
  };
}