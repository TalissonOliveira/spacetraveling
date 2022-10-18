import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import Header from '../../components/Header'

import { getPrismicClient } from '../../services/prismic';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
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
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Post | SpaceTraveling</title>
      </Head>

      <Header />

      <img className={styles.banner} src="https://images.prismic.io/spacetraveling-challenge-reactjs/5966889c-1dea-4383-95d0-d6010ec0cc78_roman-synkevych-vXInUOv1n84-unsplash+2.png?auto=compress,format" alt="Banner" />

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>Criando um app CRA do zero</h1>
          <div className={styles.info}>
            <div>
              <FiCalendar size={20} />
              <time>
                {format(
                  new Date(),
                  'dd MMM yyyy',
                  {
                    locale: ptBR,
                  }
                )}
              </time>
            </div>
            <div>
              <FiUser size={20} />
              <span>Talisson Oliveira</span>
            </div>
            <div>
              <FiClock size={20} />
              <span>4 min</span>
            </div>
          </div>

          <div className={styles.content}>
            <h2>Introdução como criar um CRA</h2>
            <p>
              Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.
            </p>
          </div>
        </article>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
