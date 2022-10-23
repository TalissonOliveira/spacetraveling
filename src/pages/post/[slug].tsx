import Head from 'next/head';
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import Header from '../../components/Header';
import Comments from '../../components/Comments'
import ptBR from 'date-fns/locale/pt-BR';

import styles from './post.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function Post({ post, prevPost, nextPost }: PostProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div>Carregando...</div>
    )
  }

  const estimatedReadingTime = post.data.content.reduce((acc, currentValue) => {
    const numberOfWordsInTheTitle = currentValue.heading.split(' ').length
    const numberOfWordsInTheBody = RichText.asText(currentValue.body).split(' ').length
    const averageWordsPerMinute = 200

    return acc + Math.ceil((numberOfWordsInTheTitle + numberOfWordsInTheBody) / averageWordsPerMinute)
  }, 0)

  return (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>

      <Header />

      <img className={styles.banner} src={post.data.banner.url} alt="Banner do post" />

      <main className={styles.container}>
        <article className={styles.post}>
         <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <div>
              <FiCalendar size={20} />
              <time>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
            </div>
            <div>
              <FiUser size={20} />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock size={20} />
              <span>{estimatedReadingTime} min</span>
            </div>
          </div>

          <div className={styles.content}>
            {post.data.content.map(postContent => (
              <div key={postContent.heading}>
                <h2>{postContent.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{__html: RichText.asHtml(postContent.body)}}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
      <footer className={styles.footer}>
        <hr className={styles.divider} />
        <div className={styles.controls}>
          {prevPost && (
            <div className={styles.prevPost}>
              <Link href={prevPost.uid}>
                {prevPost.data.title}
              </Link>
              <Link href={prevPost.uid}>
                Post anterior
              </Link>
            </div>
          )}
          {nextPost && (
            <div className={styles.nextPost}>
              <Link href={nextPost.uid}>
                {nextPost.data.title}
              </Link>
              <Link href={nextPost.uid}>
                Próximo post
              </Link>
            </div>
          )}
        </div>

        <Comments />
      </footer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid
    }
  }))

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params  }) => {
  const { slug } = params

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  const nextPostResponse = await prismic.getByType('posts', {
    pageSize: 1,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date'
    }
  })

  const prevPostResponse = await prismic.getByType('posts', {
    pageSize: 1,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc'
    }
  })

  return {
    props: {
      prevPost: nextPostResponse.results[0] || null,
      nextPost: prevPostResponse.results[0] || null,
      post: response
    }
  }
};
