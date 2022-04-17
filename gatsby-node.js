const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const portfolio = path.resolve('./src/templates/portfolio.js')

  const result = await graphql(
    `
      {
        allContentfulPortfolio {
          nodes {
            title
            slug
          }
        }
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes
  const portfolios = result.data.allContentfulPortfolio.nodes

  // Create portfolio pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (portfolios.length > 0) {
    portfolios.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : portfolios[index - 1].slug
      const nextPostSlug =
        index === portfolios.length - 1 ? null : portfolios[index + 1].slug

      createPage({
        path: `/portfolio/${post.slug}/`,
        component: portfolio,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
