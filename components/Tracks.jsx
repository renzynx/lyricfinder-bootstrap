import Link from "next/link";
import style from "../styles/Track.module.css";

export const Tracks = ({ track }) => {
  return (
    <div className={style.bruh}>
      <Link
        href={`/lyric?q=${track.track_name} ${track.artist_name}`}
        passHref={true}
      >
        <div className="card mb-4 shadow-sm ">
          <div className="card-body">
            <h5>{track.artist_name}</h5>
            <p className="card-text">
              <strong>Track</strong>: {track.track_name}
              <br />
              <strong>Album</strong>: {track.album_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
