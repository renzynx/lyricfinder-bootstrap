import Head from "next/head";
import YouTube from "youtube-sr";
import { getSong } from "gnus_xyz";
import { getSongByID } from "../utils/getSongById";
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

    const ytResID = await YouTube.searchOne(q);
    const embedLinkID = `https://www.youtube.com/embed/${ytResID.id}?rel=0`;

    return {
      props: {
        data: payload,
        embed: embedLinkID,
        title: ytResID.title,
      },
    };
  }

  payload = await getSong({
    apiKey: process.env.LYRIC,
    title: q,
    artist: " ",
    optimizeQuery: true,
  });

  const ytRes = await YouTube.searchOne(q);
  const embedLink = `https://www.youtube.com/embed/${ytRes.id}?rel=0`;

  return {
    props: { data: payload, embed: embedLink, title: ytRes.title },
  };
}
