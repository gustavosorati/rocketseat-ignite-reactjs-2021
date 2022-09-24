import { GetStaticProps } from 'next';
import Header from '../components/Header';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export default function Home({postsPagination}: HomeProps) {
  const [nextPage, setNextPage]  = useState(postsPagination.next_page);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results.map((post) => {
    return {
      ...post,
      first_publication_date: format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR })
    }
  }));

  
  async function handleNextPage(): Promise<void> {
      const response = await fetch(nextPage);
      const postsResponse = await response.json();

      console.log(postsResponse)
      setNextPage(postsResponse.next_page)
      
      const newPosts: Post[] = postsResponse.results.map((post) => {
        return {
          uid: post.uid,
          first_publication_date: format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR }),
          data: {
            title: post.data.title,
            subtitle: post.data.subtitle,
            author: post.data.author,
          }
        }
      });
      setPosts([...posts, ...newPosts]);
  }


  return (
    <main className={styles.container}>
      <Header />
    
      <section>
        {posts.map(post => (
          <article className={styles.content} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h1>{post.data.title}</h1>
                <p>{post.data.subtitle}</p>
                <div className={styles.postInformations}>
                  <time className={styles.infoProps}>
                    <FiCalendar size={20} />
                    {post.first_publication_date}
                  </time>
                  <span className={styles.infoProps}>
                    <FiUser size={20} />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          </article>
        ))} 

      </section>
      
      {!!nextPage && (
        <button className={styles.nextPage}
          onClick={() => handleNextPage()}
        >
            Carregar mais posts
        </button>
      )}
      
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  
  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], { 
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 1
  });
  
  const posts: Post[] = postsResponse.results.map((post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts
  }

  return {
    props: {
      postsPagination
    },
    revalidate: 60 * 30, 
  }
};
