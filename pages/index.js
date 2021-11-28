import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Tracks } from "../components/Tracks";

export default function Home({ track_list }) {
  return (
    <>
      <Head>
        <title>lyricfinder</title>
        <meta
          name="description"
          content="A website made to find your favourite song lyric."
        />
      </Head>
      <Navbar />
      <h3 style={{ textAlign: "center", color: "white" }}>HOT SONGS</h3>
      <div
        className="container"
        style={{ marginTop: "10vh", marginBottom: "100px" }}
      >
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
          {track_list.map((item, index) => {
            return <Tracks key={index} track={item.track} />;
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.URL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.KEY}`
  );
  const data = await res.json();

  const tracks = data.message.body.track_list;

  return {
    props: { track_list: tracks },
  };
}
