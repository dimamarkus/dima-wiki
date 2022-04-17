import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Container from './container'
import Tags from './tags'
import * as styles from './portfolio-preview.module.css'

const PortfolioPreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      <ul className={styles.portfolioList}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link to={`/portfolio/${post.slug}`} className={styles.link}>
                <GatsbyImage
                  alt=""
                  image={post.featuredImage.gatsbyImageData}
                />
                <h2 className={styles.title}>{post.title}</h2>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.description.childMarkdownRemark.html,
                }}
              />
              <div className={styles.meta}>
                <small className="meta">{post.publishDate}</small>
                <Tags tags={post.tags} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default PortfolioPreview
