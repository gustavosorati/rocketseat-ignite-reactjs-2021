import { GetStaticPaths, GetStaticProps } from "next"
import Link from 'next/link';
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import styles from './../post.module.scss';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna Continue Reading?
            <Link href="/">
              <a>Subscribe now 🤔</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

// Gerar todas as páginas estáticas durante a build -- yarn  build
// o next já iria gerar todos html de todas páginas que estivessem o getStaticProps

// Gerar a página estática no primeiro acesso

// Metade de cada um dos dois modelos

// Retorna quais posts eu quero gerar durante a build, como o path está vazio eles vão ser carregados durante o primeiro acesso
// fallback: true, false, 'blocking'
// true - se alguem tentar acessar um post de forma estática, carregue o post pelo lado do cliente
// false - retorna um 404 se o post ainda não foi gerado de forma estática
// blocking - vai tentar carregar atráves do SSR do Next
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// Toda página que é gerada de forma estática é uma página que não é protegida
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {post},
    redirect: 60 * 30 // 30min
  };
}