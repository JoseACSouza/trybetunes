import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      userName, userDescription, userImage, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick } = this.props;
    return (
      <div className="form">
        <form>
          <label>
            Nome:
            <input
              type="text"
              name="userName"
              value={ userName }
              onChange={ onInputChange }
              data-testid="edit-input-name"
            />
          </label>
          <label>
            Descrição
            <textarea
              data-testid="edit-input-description"
              name="userDescription"
              value={ userDescription }
              onChange={ onInputChange }
            />
          </label>
          <label>
            Url da imagem
            <input
              type="text"
              name="userImage"
              data-testid="edit-input-image"
              value={ userImage }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            name="isSaveButtonDisabled"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}
Form.propTypes = {
  userName: PropTypes.string.isRequired,
  userDescription: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
