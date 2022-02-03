import { gql } from '@apollo/client';
import client from "../lib/apollo-client";

// Components
import HeroBlock from '../components/HeroBlock/HeroBlock';
import BlockRender from '../components/BlockRender/ BlockRender';

export default function BlogPage({ blogPage, blocks }) {
  return (
    <div className="layout">
      <HeroBlock data={blogPage._pageHero} />
      <BlockRender blocks={blocks} />
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

  const [blogPage] = blogPage_All.items;

  const blogPosts = blogPost_All.items;

  return {
    props: {
      blogPage,
      blocks: [
        { __typename: "BlogPosts", blogPosts },
      ]
    },
  };
}