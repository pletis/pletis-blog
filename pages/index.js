import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/Date';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   console.log( 'SSG' );
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export async function getServerSideProps() {
  const allPostsData = getSortedPostsData();
  console.log('server');
  return {
    props: {
      allPostsData,
    },
  };
}

// export async function getStaticProps() {
//   const response = await fetch('http://localhost:3000/api/posts');
//   const json = await response.json();
//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostData] = useState([]);
  // useEffect(() => {
  //   fetch('/api/posts').then(res => res.json()).then(data => setAllPostData(data.allPostsData));
  // })
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Next.js 를 배우고 있는 초보 개발자</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
