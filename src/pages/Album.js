import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      albumData: {},
      musicList: [],
      isChecked: [],
    };
  }

  componentDidMount() {
    this.getAlbumName();
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
    });
  };

  getAlbumName = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const results = await getMusics(id);

    this.setState({
      isLoading: false,
      albumData: results[0],
      musicList: results.filter((item) => results.indexOf(item) !== 0),

    });
  };

  render() {
    const { isLoading, albumData, musicList } = this.state;
    const { artistName, collectionName, artworkUrl100 } = albumData;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <div className="flex justify-evenly m-4">
            <div className="my-20">
              <img
                src={ artworkUrl100 }
                alt={ collectionName }
                className="w-64"
              />
              <h2
                data-testid="album-name"
                className="mt-1 text-center"
              >
                {collectionName}
              </h2>
              <h3
                data-testid="artist-name"
                className="text-center text-sm"
              >
                {artistName}
              </h3>
            </div>
            <div>
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
