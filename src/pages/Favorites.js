import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      musicList: [],
      isChecked: [],
    };
  }

  componentDidMount() {
    this.getSongList();
  }

  onInputChange = (event) => {
    const { name, checked } = event.target;
    const { musicList } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      if (checked) {
        await addSong(musicList
          .find((song) => song.trackId === parseInt(name, 10)));
      } else {
        await removeSong(musicList
          .find((song) => song.trackId === parseInt(name, 10)));
      }
      await this.getSongList();
      this.setState({
        isLoading: false,
      });
    });
  };

  getSongList = async () => {
    this.setState({
      isLoading: true,
    });
    const songList = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      isChecked: songList.filter((item) => item.trackId).map((song) => song.trackId),
      musicList: songList.filter((item) => item.trackId),
    });
  };

  render() {
    const { isLoading, musicList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            { musicList.map((music) => {
              const { isChecked } = this.state;
              return (
                <div key={ music.trackId }>
                  <MusicCard
                    trackId={ music.trackId }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    onInputChange={ this.onInputChange }
                    isChecked={ isChecked }
                  />
                </div>
              );
            }) }
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
