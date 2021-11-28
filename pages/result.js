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
          const {
            track: { track_name, artist_name, album_name },
          } = item;

          return (
            <div className={style.bruh} key={index}>
              <Link
                href={`/lyric?name=${track_name}&artist=${artist_name}`}
                passHref={true}
              >
                <div className="card mb-4 shadow-sm ">
                  <div className="card-body">
                    <h5>{artist_name}</h5>
                    <p className="card-text">
                      <strong>Track</strong>: {track_name}
                      <br />
                      <strong>Album</strong>: {album_name}
                    </p>
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

    return;
  }

  const res = await fetch(
    `${process.env.URL}track.search?q_track=${q}&apikey=${process.env.KEY}&page=1&page_size=10&s_track_rating=desc`
  );

  const data = await res.json();

  const { track_list } = data.message.body;

  return {
    props: {
      data: track_list,
      query: q,
    },
  };
}
