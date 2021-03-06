import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import SidebarLayout from 'src/components/SidebarLayout'
import Content, { HTMLContent } from 'src/components/Content'

export const BookTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className='section'>
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={ content} />
            {tags && tags.length ? (
              <div style={ { marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className='taglist'>
                  {tags.map((tag) => (
                    <li key={ tag + `tag`}>
                      <Link to={ `/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BookTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Book = ({ data }) => {
  const { markdownRemark: post } = data
  const sidebar = (
    <p>test</p>
  )

  const content = (
    <BookTemplate
      content={ post.html }
      contentComponent={ HTMLContent }
      description={ post.frontmatter.description }

      tags={ post.frontmatter.tags }
      title={ post.frontmatter.title }
    />
  )

  return (
    <SidebarLayout
      sidebar={ sidebar }
      content={ content }
    />
  )
}

Book.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Book

export const bookQuery = graphql`
  query BookByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
