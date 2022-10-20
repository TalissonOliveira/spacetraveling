import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { format } from 'date-fns';
import { getPrismicClient } from '../services/prismic';
import Header from '../components/Header';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination.results)
  const [nextPage, setNextPage] = useState(postsPagination.next_page)
  const [isLoading, setIsLoading] = useState(false)

  function loadMorePosts() {
    setIsLoading(true)

    setTimeout(async () => {
      try {
        const response = await fetch(`${nextPage}`)
        const data: PostPagination = await response.json()

        setPosts(prevState => [...prevState, ...data.results])
        setNextPage(data.next_page)

      } catch (error) {
        console.log('Ocorreu um erro ao tentar carregar mais posts.')

      } finally {
        setIsLoading(false)
      }
    }, 200);
  }

  return (
    <>
      <Head>
        <title>Posts | SpaceTraveling</title>
      </Head>

      <div className={styles.container}>
        <Header />

        <main>
          <div className={styles.posts}>
            {posts.map(post => (
              <Link key={post.uid} href={`/post/${post.uid}`}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>

                  <div className={styles.info}>
                    <div>
                      <FiCalendar size={20} />
                      <time>
                        {format(
                          new Date(post.first_publication_date),
                          'dd MMM yyyy',
                          {
                            locale: ptBR,
                          }
                        )}
                      </time>
                    </div>
                    <div>
                      <FiUser size={20} />
                      <span>{post.data.author}</span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {nextPage && !isLoading && (
            <button
              className={styles.more}
              onClick={loadMorePosts}
            >
              Carregar mais posts
            </button>
          )}

          {isLoading && (
            <div className={styles.loading}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps  = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("posts", {
    pageSize: 5,
  });

  return {
    props: {
      postsPagination: postsResponse,
      revalidate: 60 * 5 // 5 minutes
    }
  }
};
