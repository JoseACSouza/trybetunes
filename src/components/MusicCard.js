/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName, previewUrl, trackId, onInputChange, isChecked,
    } = this.props;
    return (
      <div className="flex items-center justify-between border-t-2 p-4">
        <p>
          {trackName}
        </p>
        <div className="flex">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            <code>audio</code>
          </audio>
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="custom"
            >
              <input
                type="checkbox"
                className="peer relative appearance-none w-5 h-5 border rounded-md
              border-blue-gray-200 cursor-pointer transition-all before:content['']
              before:block before:bg-blue-gray-500 before:w-12 before:h-12
              before:rounded-full before:absolute before:top-2/4
              before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4
              before:opacity-0 hover:before:opacity-10 before:transition-opacity
              checked:bg-red-700 checked:border-gray-900 checked:before:bg-gray-900"
                id="custom"
                onChange={ onInputChange }
                name={ trackId }
                checked={ isChecked.includes(trackId) }
              />
              <span
                className="absolute text-white transition-opacity opacity-0
              pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4
              peer-checked:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656
                  5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
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
