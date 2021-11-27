import axios from "axios";
import cio from "cheerio-without-node-native";

export const getSongByID = async (id, key) => {
  try {
    let {
      data: {
        response: { song },
      },
    } = await axios.get(
      `https://cors.lyricfinder.workers.dev/?https://api.genius.com/songs/${id}?access_token=${key}`
    );
    let lyrics = await extractLyrics(song.url);
    return {
      id: song.id,
      title: song.full_title,
      url: song.url,
      lyrics,
      albumArt: song.song_art_image_url,
    };
  } catch (e) {}
};

const extractLyrics = async (url) => {
  try {
    let { data } = await axios.get(
      `https://cors.lyricfinder.workers.dev/?${url}`
    );
    const $ = cio.load(data);
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
      lyrics = "";
      $('div[class^="Lyrics__Container"]').each((i, elem) => {
        if ($(elem).text().length !== 0) {
          let snippet = $(elem)
            .html()
            .replace(/<br>/g, "\n")
            .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
          lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
        }
      });
    }
    if (!lyrics) return null;
    return lyrics.trim();
  } catch (e) {}
};
