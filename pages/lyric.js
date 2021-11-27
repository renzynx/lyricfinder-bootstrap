import Head from "next/head";
import { getSong } from "gnus_xyz";
import { getSongByID } from "../utils/getSongById";
import { Navbar } from "../components/Navbar";

export default function Lyric(props) {
  if (!props?.data)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  const parsed = props.data.lyrics.split("\n").map((str, e) => (
    <p key={e} style={{ color: "white" }}>
      {str}
    </p>
  ));

  return (
    <>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <Navbar />
      <div className="text-center mb-5">
        <img
          src={props.data.albumArt}
          className="img-thumbnail"
          alt="..."
          style={{
            maxHeight: "200px",
            maxWidth: "200px",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "20px",
          }}
        />
        <h4 className="mb-4 " style={{ color: "white" }}>
          {props.data.title}
        </h4>
        {parsed}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;

  if (!q) {
    if (window) return (window.location.href = "https://lyricfinder.xyz/");
  }

  let payload;

  if (query.id) {
    payload = await getSongByID(query.id, process.env.LYRIC);

    return {
      props: {
        data: payload,
        query: q,
      },
    };
  }

  payload = await getSong({
    apiKey: process.env.LYRIC,
    title: q,
    artist: " ",
    optimizeQuery: true,
  });

  return {
    props: { data: payload },
  };
}
