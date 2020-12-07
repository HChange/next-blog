import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import {useRouter} from 'next/router'
import React from "react";
import { ResponseData } from "./types";

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
