import React from 'react';

class CardFront extends React.Component {
  render() {
    const { cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.props;
    return (
      <div className="fieldset-card-div">
        <div className="preview-card-div">

          <div className="name-and-mana-div">
            <div className="name-div">
              <h4
                data-testid="name-card"
              >
                { cardName }
              </h4>
            </div>

            <div className="mana-div">
              <h4
                data-testid="attr3-card"
                >
                { cardAttr3 }
              </h4>
            </div>
          </div>

          <div className="img-div">
            <img
              src={ cardImage }
              data-testid="image-card"
            />
          </div>

          <div className="rarity-div">
            <div className="rarity-field">
              <h5
                data-testid="rare-card"
              >
                
                { cardRare }
              </h5>
            </div>
          </div>

          <div className="description-div">
            <p
              data-testid="description-card"
            >
               
              { cardDescription }
            </p>
          </div>

          <div className="power-toughness-div">
            <div className="power-toughness-div-2">
              <div className="power-div">
                <h4
                  data-testid="attr1-card"
                >
                  
                  { cardAttr1 }
                </h4>
              </div>
              <div className="slash-div">
                <h4>/</h4>
              </div>
              <div className="toughness-div">
                <h4
                  data-testid="attr2-card"
                >
                  
                  { cardAttr2 }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardFront;
