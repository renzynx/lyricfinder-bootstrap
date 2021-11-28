import Head from "next/head";
import YouTube from "youtube-sr";
import { getSong } from "gnus_xyz";
import { Navbar } from "../components/Navbar";

export default function Lyric(props) {
  if (!props?.data)
    return (
      <div
        className="spinner-border text-primary mx-auto my-20px"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  const lyric = props.data.lyrics;

  return (
    <>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <Navbar />
      <div className="vstack text-center mb-5">
        <button
          className="btn btn-outline-danger mx-auto mb-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#playerCollapse"
          aria-expanded="false"
          aria-controls="playerCollapse"
        >
          Music Video
        </button>
        <div className="collapse mb-4" id="playerCollapse">
          <div className="ratio ratio-16x9 mx-auto" style={{ width: "70%" }}>
            <iframe
              src={props.embed}
              title={props.title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
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
        <p style={{ color: "white", whiteSpace: "pre-line" }}>{lyric}</p>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { name, artist } = query;

  if (!name || !artist)
    return {
      notFound: true,
    };

  const payload = await getSong({
    apiKey: process.env.LYRIC,
    title: name,
    artist: artist,
    optimizeQuery: true,
  });

  const ytRes = await YouTube.searchOne(`${name} ${artist}`);

  return {
    props: {
      data: payload,
      embed: `https://www.youtube.com/embed/${ytRes.id}?rel=0`,
      title: ytRes.title,
    },
  };
}
