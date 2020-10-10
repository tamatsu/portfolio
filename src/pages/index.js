import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"

const query = graphql`
{
  allStrapiWorks {
    edges {
      node {
        strapiId
        name
        description
        image {
          childImageSharp {
            fixed(width: 200, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
}
`

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Helmet
        meta={[
          { name: 'charSet', content: 'utf-8' },
        ]}>
        <title>Portfolio</title>
        <link rel="canonical" href="https://portfolio.acrux.jp/" />
        <html lang="ja" />
      </Helmet>
      <div className="m-2 max-w-screen-sm">
        <h1 className="font-bold text-3xl text-gray-800">Portfolio</h1>
        <StaticQuery
          query={query}
          render={data => (
            <div className="mt-2">
              {data.allStrapiWorks.edges.map(work => (
                <div
                  key={work.node.strapiId}
                  className="p-2 rounded-lg border shadow-lg"
                >
                  <div className="text-xl text-gray-800">
                    {work.node.name}
                  </div>
                  <div className="mt-2 text-gray-700">
                    {work.node.description}
                  </div>
                  <Img
                    fixed={work.node.image.childImageSharp.fixed}
                  />
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  )
}
