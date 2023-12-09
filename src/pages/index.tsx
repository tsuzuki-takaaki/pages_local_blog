import { GetStaticProps } from 'next'
import Head from 'next/head'
import prisma from '../../lib/prisma'

import type { Post } from '@prisma/client'

export const getStaticProps: GetStaticProps = async () => {
  // See https://flaviocopes.com/nextjs-serialize-date-json/
  let posts = await prisma.post.findMany()
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: { posts }
  }
}

type Props = {
  posts: Post[]
}

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Pages Local Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {props.posts.map((post) => {
          return <p key={post.id}>{post.title}</p>
        })}
      </main>
    </>
  )
}
