import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName, previewUrl, trackId, onInputChange, isChecked,
    } = this.props;
    return (
      <div>
        <p>
          {trackName }
        </p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            onChange={ onInputChange }
            name={ trackId }
            checked={ isChecked.includes(trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isChecked: [PropTypes.number.isRequired].isRequired,
};

export default MusicCard;
