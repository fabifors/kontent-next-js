import { gql } from '@apollo/client';
import React from 'react';
import Head from 'next/head';
import client from '../lib/apollo-client';
import postStyles from '../styles/BlogPost.module.css';

const BlogPost = ({ blogPost }) => {
  return (
    <>
      <Head>
        <meta title={blogPost._seoMetadataExampleToIncludeInAnyType?.metaTitle} />
      </Head>
      <div className={postStyles.navigation}>
        <div className="button"><a href="/">Back</a></div>
      </div>
      <main className="container">
        <h1 className="title">{blogPost.title}</h1>
        <div className={postStyles.content} dangerouslySetInnerHTML={{ __html: blogPost.body.html }} />
      </main>
    </>
  );
};

export default BlogPost;

export async function getStaticProps({ params }) {
  try {
    const { data } = await client.query({
      variables: {
        "where": {
          "slug": {
            "eq": params.blogPost
          }
        }
      },
      query: gql`
        query BlogPost_All($where: BlogPost_Where) {
          blogPost_All(where: $where) {
            items {
              title
              summaryOptional
              body {
                html
              }
              _seoMetadataExampleToIncludeInAnyType {
                metaTitle
                metaDescription
              }
            }
          }
        }
      `
    })

    const [blogPostData] = data.blogPost_All.items;

    return {
      props: {
        blogPost: blogPostData
      },
    }

  } catch (err) {
    console.error(err);
    return {
      props: {}
    }
  }
}

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
      query: gql`
      query BlogPosts {
        blogPost_All {
          items {
            slug
          }
        }
      }
      `
    })

    const blogPosts = data.blogPost_All.items;

    const paths = blogPosts.map(({ slug }) => {
      return {
        params: {
          blogPost: slug
        }
      }
    })

    return {
      paths,
      fallback: false
    }

  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: false
    }
  }
}