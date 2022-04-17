import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PortfolioPreview from '../components/portfolio-preview'

class PortfolioIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulPortfolio.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Portfolio" />
        <Hero title="Portfolio" />
        <PortfolioPreview posts={posts} />
      </Layout>
    )
  }
}

export default PortfolioIndex

export const pageQuery = graphql`
  query PortfolioIndexQuery {
    allContentfulPortfolio(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        featuredImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
