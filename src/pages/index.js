import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"

const query = graphql`
{
  allStrapiWorks {
    edges {
      node {
        createdAt
        strapiId
        name
        description
        siteurl
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_noBase64
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
    <div className="bg-gray-200 pb-64">
      <Helmet
        meta={[
          { name: 'charSet', content: 'utf-8' },
        ]}>
        <title>Portfolio</title>
        <link rel="canonical" href="https://portfolio.acrux.jp/" />
        <html lang="ja" />
      </Helmet>
      <div className="mx-2">
        <h1 className="font-bold text-3xl text-gray-800">Portfolio</h1>
        <StaticQuery
          query={query}
          render={data => (
            <div className="mt-4 md:mx-2 flex flex-wrap">
              {data.allStrapiWorks.edges
              .sort((a, b) => {
                return Date.parse(b.node.createdAt) - Date.parse(a.node.createdAt)
              })
              .map(work => (
                <div
                  key={work.node.strapiId}
                  className="mt-6 w-full md:w-1/2 lg:w-1/3"
                >
                  <a
                    href={work.node.siteurl}
                    target={work.node.strapiId}
                    >
 
                    <div
                      className="md:mx-2 rounded-lg border shadow-lg overflow-hidden bg-gray-100"
                    >
                {work.node.image &&
                      <Img
                        fluid={work.node.image.childImageSharp.fluid}
                        className="h-32 p-1 border-b-2"
                      />
                }
                      <div className="p-6">
                        <div className="text-2xl text-gray-800">
                          {work.node.name}
                        </div>
                        <div className="mt-4 text-gray-700">
                          {work.node.description}
                        </div>

                        <div class="mt-4 font-bold text-lg text-gray-700">
                          コードを見る
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  )
}
