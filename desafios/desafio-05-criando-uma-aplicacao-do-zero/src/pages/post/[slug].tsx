import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';
import Prismic from '@prismicio/client';


import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';


interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
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

export default function Post({post}: PostProps) {
  const router = useRouter();

  if(router.isFallback) {
    return <h1>Carregando...</h1>
  }

  const totalWords = post.data.content.reduce((total, item) => {
    if(item.heading)
      total += item.heading.split(' ').length;

    const words = item.body.map((word) => {
      return +word.text.split(' ').length
    }).reduce((totalWords, x) => totalWords += x);
    
    return total + words
  }, 0);

  const readingTime = Math.ceil(totalWords / 200);

  const formatedData = format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR });

  return (
    <main>
      <Header />

      <figure className={styles.banner}>
        <img src={post.data.banner.url} alt={post.data.banner.url} />
      </figure>
    
      <article className={commonStyles.container}>

      <header className={styles.article}>
        <h1>{post.data.title}</h1>
        <div className={styles.postInformations}>
          <time>
            <FiCalendar />
            {formatedData}
          </time>
          <span>
            <FiUser />
            {post.data.author}
          </span>
          <span>
            <FiClock />
            {`${readingTime} min`} 
          </span>
        </div>

        {post.data.content.map(pub => (
          <article key={pub.heading}>
            <h2>{pub.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: RichText.asHtml(pub.body) }}/>
          </article>
        ))}
      </header>




      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid
      }
    }
  })

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(c => {
        return {
          heading: c.heading,
          body: [...c.body]
        }
      }), 
    }
  }

  return {
    props: {
      post: post
    }
  }
};
