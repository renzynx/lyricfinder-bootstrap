import { searchSong } from "gnus_xyz";
import { Navbar } from "../components/Navbar";
import style from "../styles/Track.module.css";
import Link from "next/link";
import Head from "next/head";

export default function Result(props) {
  if (!props?.data)
    return (
      <div
        className="spinner-border text-primary mx-auto my-20px"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <>
      <Head>
        <title>Result for {props.query}</title>
      </Head>
      <Navbar />
      <div
        className="row row-cols-1 row-cols-sm-1 row-cols-md-2 mx-auto"
        style={{ maxWidth: "90%" }}
      >
        {props.data.map((item, index) => {
          return (
            <div className={style.bruh} key={index}>
              <Link
                href={`/lyric?q=${item.title}&id=${item.id}`}
                passHref={true}
              >
                <div
                  className="card mb-4 shadow-sm"
                  style={{ overflow: "hidden" }}
                >
                  <div className="hstack gap-5">
                    <img
                      src={item.albumArt}
                      alt="Album art"
                      style={{
                        maxHeight: "120px",
                        maxWidth: "120px",
                      }}
                    />
                    <div className="card-body">
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;

  if (!q) {
    if (window) return (window.location.href = "https://lyricfinder.xyz/");
  }

  const payload = await searchSong({
    apiKey: process.env.LYRIC,
    title: q,
    artist: " ",
    optimizeQuery: true,
  });

  return {
    props: {
      data: payload,
      query: q,
    },
  };
}
