import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

class PortfolioTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPortfolio')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')

    return (
      <Layout location={this.props.location}>
        <Seo
          title={post.title}
          description={post.description.childMarkdownRemark.excerpt}
          image={`http:${post.featuredImage.resize.src}`}
        />
        <Hero
          image={post.featuredImage?.gatsbyImageData}
          title={post.title}
          content={post.description?.childMarkdownRemark?.excerpt}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {post.body?.childMarkdownRemark?.timeToRead} minute read
          </span>
          <div className={styles.portfolio}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: post.body?.childMarkdownRemark?.html,
              }}
            />
            <Tags tags={post.tags} />
            {(previous || next) && (
              <nav>
                <ul className={styles.portfolioNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PortfolioTemplate

export const pageQuery = graphql`
  query PortfolioBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPortfolio(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      featuredImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      tags
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
    previous: contentfulPortfolio(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPortfolio(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
