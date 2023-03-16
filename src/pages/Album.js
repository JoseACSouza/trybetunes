import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      albumData: {},
      musicList: [],
      favoriteSongList: [],
      isChecked: [],
    };
  }

  componentDidMount() {
    this.getAlbumName();
    this.getSongList();
  }

  onInputChange = (event) => {
    const { name } = event.target;
    const { favoriteSongList, albumData, musicList, isChecked } = this.state;
    favoriteSongList[0] = albumData;
    this.setState({
      isLoading: true,
      favoriteSongList: favoriteSongList
        .some((song) => song.trackId === parseInt(name, 10)) ? [...favoriteSongList] : (
          [...favoriteSongList, musicList
            .find((song) => song.trackId === parseInt(name, 10))]
        ),
    }, async () => {
      await addSong(musicList.find((song) => song.trackId === parseInt(name, 10)));
      this.setState({
        isLoading: false,
        isChecked: isChecked.includes(parseInt(name, 10)) ? [...isChecked] : (
          [...isChecked, parseInt(name, 10)]
        ),
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
    });
  };

  getAlbumName = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const results = await getMusics(id);
    // , this.setState({
    //   isChecked: favoritesSong.filter((item) => results
    //     .indexOf(item) !== 0)
    //     .map((song) => song.trackId),
    // })
    this.setState({
      isLoading: false,
      albumData: results[0],
      musicList: results.filter((item) => results.indexOf(item) !== 0),

    });
  };

  render() {
    const { isLoading, albumData, musicList } = this.state;
    const { artistName, collectionName } = albumData;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <h2 data-testid="album-name">{collectionName}</h2>
            <h3 data-testid="artist-name">{artistName}</h3>
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
