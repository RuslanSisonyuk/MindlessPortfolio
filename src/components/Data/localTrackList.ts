import { LocalTrack } from "../Types/localTrack"
import { Soundcloud } from "soundcloud.ts"

// export async function FetchTracks() {
//   const CLIENT_ID = 'T26Olo5VaFwfbJtWjYtvIFx3vOe4v84D';
//   const playlistId = '1797678345';
//   // const soundcloud = new Soundcloud('T26Olo5VaFwfbJtWjYtvIFx3vOe4v84D',"2-304104-1193079238-nEkoxdB9GHVCv");
//   // const track = await soundcloud.tracks.get("succducc/azure").then(newtrack => newtrack.title);
//   // return track;
//   // <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1797678345&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/idla" title="Best Playlists Ever" target="_blank" style="color: #cccccc; text-decoration: none;">Best Playlists Ever</a> · <a href="https://soundcloud.com/idla/sets/the-fabulous-thunderbirds" title="The Fabulous Thunderbirds - Struck Down" target="_blank" style="color: #cccccc; text-decoration: none;">The Fabulous Thunderbirds - Struck Down</a></div>

//   try {
//     const response = await fetch(
//       `https://api.soundcloud.com/playlists/${playlistId}?client_id=${CLIENT_ID}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const playlist = await response.json();
//     return playlist.tracks; // Array of track objects
//   } catch (error) {
//     console.error('Error fetching playlist:', error);
//     return [];
//   }
// }

export const localTracks: LocalTrack[] = [
    {
      id: "1",
      title: "El Baile del Queso",
    //   artist: "Mindless",
      album: "Album 1",
      duration: 240000,
    //   genre: "Ambient",
      audioUrl: "/assets/El Baile del Queso.mp3", // Place your MP3 files in public/audio/
      artworkUrl: "/assets/mindlesstitle4.png", // Place artwork in public/images/
    //   tags: ["chill", "ambient", "electronic"],
      dateAdded: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Primordial Jungle",
    //   artist: "Mindless",
      album: "Album 2",
      duration: 180000,
    //   genre: "Hip Hop",
      audioUrl: "/assets/Primordial Jungle.mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["hip hop", "beats", "urban"],
      dateAdded: "2024-01-14T15:30:00Z",
    },
    {
      id: "3",
      title: "Molten Heights",
    //   artist: "Mindless",
      album: "Album 3",
      duration: 320000,
    //   genre: "Electronic",
      audioUrl: "/assets/Molten Heights (1).mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["synthwave", "retro", "electronic"],
      dateAdded: "2024-01-13T20:15:00Z",
    },
    {
      id: "4",
      title: "Cosmic Ocean",
    //   artist: "Mindless",
      album: "Album 4",
      duration: 420000,
    //   genre: "Jazz",
      audioUrl: "/assets/Cosmic Ocean.mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["jazz", "fusion", "experimental"],
      dateAdded: "2024-01-12T12:45:00Z",
    },
    {
      id: "5",
      title: "Lo-Fi Study Session",
    //   artist: "Mindless",
      album: "Album 2",
      duration: 180000,
    //   genre: "Lo-Fi",
      audioUrl: "/assets/Primordial Jungle.mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["lofi", "chill", "study", "beats"],
      dateAdded: "2024-01-11T09:20:00Z",
    },
    {
      id: "6",
      title: "Deep House Groove",
    //   artist: "Mindless",
      album: "Album 1",
      duration: 380000,
    //   genre: "House",
      audioUrl: "/audio/deep-house.mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["deep house", "electronic", "dance"],
      dateAdded: "2024-01-10T18:00:00Z",
    },
    {
      id: "7",
      title: "Molten Heights",
    //   artist: "Mindless",
      album: "Album 1",
      duration: 320000,
    //   genre: "Electronic",
      audioUrl: "/assets/Molten Heights (1).mp3",
      artworkUrl: "/assets/mindlesstitle4.png",
    //   tags: ["synthwave", "retro", "electronic"],
      dateAdded: "2024-01-13T20:15:00Z",
    },
    {
        id: "8",
        title: "El Baile del Queso",
        // artist: "Mindless",
        album: "Album 4",
        duration: 240000,
        // genre: "Ambient",
        audioUrl: "/assets/El Baile del Queso.mp3", // Place your MP3 files in public/audio/
        artworkUrl: "/assets/mindlesstitle4.png", // Place artwork in public/images/
        // tags: ["chill", "ambient", "electronic"],
        dateAdded: "2024-01-15T10:00:00Z",
      },
      {
        id: "9",
        title: "Primordial Jungle",
        // artist: "Mindless",
        album: "Album 3",
        duration: 180000,
        // genre: "Hip Hop",
        audioUrl: "/assets/Primordial Jungle.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["hip hop", "beats", "urban"],
        dateAdded: "2024-01-14T15:30:00Z",
      },
      {
        id: "10",
        title: "Molten Heights",
        // artist: "Mindless",
        album: "Album 2",
        duration: 320000,
        // genre: "Electronic",
        audioUrl: "/assets/Molten Heights (1).mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["synthwave", "retro", "electronic"],
        dateAdded: "2024-01-13T20:15:00Z",
      },
      {
        id: "11",
        title: "Cosmic Ocean",
        // artist: "Mindless",
        album: "Album 2",
        duration: 420000,
        // genre: "Jazz",
        audioUrl: "/assets/Cosmic Ocean.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["jazz", "fusion", "experimental"],
        dateAdded: "2024-01-12T12:45:00Z",
      },
      {
        id: "12",
        title: "Lo-Fi Study Session",
        // artist: "Mindless",
        album: "Album 1",
        duration: 180000,
        // genre: "Lo-Fi",
        audioUrl: "/assets/Primordial Jungle.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["lofi", "chill", "study", "beats"],
        dateAdded: "2024-01-11T09:20:00Z",
      },
      {
        id: "13",
        title: "Deep House Groove",
        // artist: "Mindless",
        album: "Album 1",
        duration: 380000,
        // genre: "House",
        audioUrl: "/audio/deep-house.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["deep house", "electronic", "dance"],
        dateAdded: "2024-01-10T18:00:00Z",
      },
      {
        id: "14",
        title: "Molten Heights",
        // artist: "Mindless",
        album: "Album 3",
        duration: 320000,
        // genre: "Electronic",
        audioUrl: "/assets/Molten Heights (1).mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["synthwave", "retro", "electronic"],
        dateAdded: "2024-01-13T20:15:00Z",
      },
      {
        id: "15",
        title: "El Baile del Queso",
        // artist: "Mindless",
        album: "Album 2",
        duration: 240000,
        // genre: "Ambient",
        audioUrl: "/assets/El Baile del Queso.mp3", // Place your MP3 files in public/audio/
        artworkUrl: "/assets/mindlesstitle4.png", // Place artwork in public/images/
        // tags: ["chill", "ambient", "electronic"],
        dateAdded: "2024-01-15T10:00:00Z",
      },
      {
        id: "16",
        title: "Primordial Jungle",
        // artist: "Mindless",
        album: "Album 4",
        duration: 180000,
        // genre: "Hip Hop",
        audioUrl: "/assets/Primordial Jungle.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["hip hop", "beats", "urban"],
        dateAdded: "2024-01-14T15:30:00Z",
      },
      {
        id: "17",
        title: "Molten Heights",
        // artist: "Mindless",
        album: "Album 3",
        duration: 320000,
        // genre: "Electronic",
        audioUrl: "/assets/Molten Heights (1).mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["synthwave", "retro", "electronic"],
        dateAdded: "2024-01-13T20:15:00Z",
      },
      {
        id: "18",
        title: "Cosmic Ocean",
        // artist: "Mindless",
        album: "Album 2",
        duration: 420000,
        // genre: "Jazz",
        audioUrl: "/assets/Cosmic Ocean.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["jazz", "fusion", "experimental"],
        dateAdded: "2024-01-12T12:45:00Z",
      },
      {
        id: "19",
        title: "Lo-Fi Study Session",
        // artist: "Mindless",
        album: "Album 1",
        duration: 180000,
        // genre: "Lo-Fi",
        audioUrl: "/assets/Primordial Jungle.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["lofi", "chill", "study", "beats"],
        dateAdded: "2024-01-11T09:20:00Z",
      },
      {
        id: "20",
        title: "Deep House Groove",
        // artist: "Mindless",
        album: "Album 4",
        duration: 380000,
        // genre: "House",
        audioUrl: "/audio/deep-house.mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["deep house", "electronic", "dance"],
        dateAdded: "2024-01-10T18:00:00Z",
      },
      {
        id: "21",
        title: "Molten Heights",
        // artist: "Mindless",
        album: "Album 3",
        duration: 320000,
        // genre: "Electronic",
        audioUrl: "/assets/Molten Heights (1).mp3",
        artworkUrl: "/assets/mindlesstitle4.png",
        // tags: ["synthwave", "retro", "electronic"],
        dateAdded: "2024-01-13T20:15:00Z",
      },
  ]