import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import {useRouter} from 'next/router'
import React from "react";

export interface ResponseData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: any;
  company?: any;
  blog: string;
  location?: any;
  email?: any;
  hireable?: any;
  bio?: any;
  twitter_username?: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

const index = ({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter()
  return (
    <div>
      {data&&<ul>
        {Object.keys(data).map((item) => {
          return (
            <li key={item}>
              <span>{item}:</span>
              <em>{data[item]}</em>
            </li>
          );
        })}
      </ul>}
      {
        router.isFallback && <div>加载中，，，</div>
      }
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const {
//     params: { username },
//   } = context;
//   const res = await fetch(`https://api.github.com/users/${username}`);
//   const data: ResponseData = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  
  const {
    params: { username },
  } = context;
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data: ResponseData = await res.json();
  return {
    props: {
      data,
    },
    // revalidate:60
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log(context);
  
  // const {params:{username}} = context;
  
  return {
    paths: [
      {
        params: {
          username:'HChange',
        },
      },
      
    ],
    fallback: true,
  };
};
export default index;
