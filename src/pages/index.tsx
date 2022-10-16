import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header';

import { FiCalendar, FiUser } from 'react-icons/fi'

import { getPrismicClient } from '../services/prismic';

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Posts | SpaceTraveling</title>
      </Head>

      <div className={styles.container}>
        <Header />

        <main>
          <div className={styles.posts}>
            <Link href={'/'}>
              <a>
                <strong>Como utilizar Hooks</strong>
                <p>Pensando em  sincronização em vez de ciclos de vida</p>

                <div className={styles.info}>
                  <div>
                    <FiCalendar size={20} />
                    <time>15 Mar 2021</time>
                  </div>
                  <div>
                    <FiUser size={20} />
                    <span>Talisson Oliveira</span>
                  </div>
                </div>
              </a>
            </Link>
            <Link href={'/'}>
              <a>
                <strong>Como utilizar Hooks</strong>
                <p>Pensando em  sincronização em vez de ciclos de vida</p>

                <div className={styles.info}>
                  <div>
                    <FiCalendar size={20} />
                    <time>15 Mar 2021</time>
                  </div>
                  <div>
                    <FiUser size={20} />
                    <span>Talisson Oliveira</span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
