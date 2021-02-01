import React, { useEffect, useState } from "react";
import play from "../../img/play.png";
import previous from "../../img/previous.png";
import pause from "../../img/pause.png";
import fastforward from "../../img/fastforward.png";

export function Home() {
	const [songList, setSongList] = useState([]);
	const [nowPlay, setNowPlay] = useState("");
	const AUDIO_TAG = document.querySelector("audio");
	const THEurl = "https://assets.breatheco.de/apis/sound/";
	const [temporalIndex, setTemporalIndex] = useState(-1);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw Error(response.statusText);
			})
			.then(dataAsJson => {
				setSongList(dataAsJson);
			})
			.catch(error => {
				"Looks like there was a problem!", error;
			});
	}, []);

	const songMap = songList.map((song, index) => {
		return (
			<li
				key={song.url}
				onClick={() => {
					let newurl = THEurl.concat(song.url);
					setNowPlay(newurl);
					setTemporalIndex(index);
				}}>
				{song.name}
			</li>
		);
	});

	function playAudio() {
		AUDIO_TAG.play();
	}

	function pauseAudio() {
		AUDIO_TAG.pause();
	}

	function previousSong(songIndex) {
		// let newurl = THEurl.concat(songList[songIndex - 1].url);
		// setNowPlay(newurl);
		// setTemporalIndex(songIndex - 1);
		let newurl = "";
		if (songList[songIndex - 1]) {
			//if this exists
			newurl = THEurl.concat(songList[songIndex - 1].url);
			setNowPlay(newurl);
			setTemporalIndex(songIndex - 1);
		} else {
			//no exists (songList[-1])
			newurl = THEurl.concat(songList[songList.length - 1].url);
			setNowPlay(newurl);
			setTemporalIndex(songList.length - 1);
		}
	}
	function nextSong(songIndex) {
		// let newurl = THEurl.concat(songList[songIndex + 1].url);
		// setNowPlay(newurl);
		// setTemporalIndex(songIndex + 1);
		let newurl = "";
		if (songList[songIndex + 1]) {
			//if this exists
			newurl = THEurl.concat(songList[songIndex + 1].url);
			setNowPlay(newurl);
			setTemporalIndex(songIndex + 1);
		} else {
			//no exists (songList[+1 de lenght])
			newurl = THEurl.concat(songList[0].url);
			setNowPlay(newurl);
			setTemporalIndex(0);
		}
	}
	return (
		<div className="container">
			<ol className="allSongsList">{songMap}</ol>
			<audio src={nowPlay} autoPlay />
			<footer>
				<button onClick={() => previousSong(temporalIndex)}>
					<img src={previous} width="50" height="50" />
				</button>
				<button onClick={playAudio}>
					<img src={play} width="50" height="50" />
				</button>
				<button onClick={pauseAudio}>
					<img src={pause} width="50" height="50" />
				</button>
				<button onClick={() => nextSong(temporalIndex)}>
					<img src={fastforward} width="50" height="50" />
				</button>
			</footer>
		</div>
	);
}
