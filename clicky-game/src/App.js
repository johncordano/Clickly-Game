

import React, {Component} from "react";
import CharacterCard from "./components/CharacterCard";
import Title from "./components/Title";
import characters from "./characters.json";
import Wrapper from "./components/Wrapper";
import './App.css';

// At the start of the game, set the score and top score to 0, and display the message about how to play the game.
let score = 0;
let topScore = 0;
let clickMessage = "Click an image to score a point, but if you click an image more than once, you lose all your points."

// Set the state for the character data in the json file, the score, the top score, and the click message.
class App extends Component {
    state = {
        characters,
        score,
        topScore,
        clickMessage
    };

    // When a character card is clicked, use the processClicked property created in the CharacterCard.js file
    processClicked = id => {
        // Create a constant for all characters and for a clicked character.
        const characters = this.state.characters;
        const clickedCharacter = characters.filter(character => character.id === id);

        // If the isClicked value for the clicked character is true, decrease the score to 0, and display the appropriate round over message. All characters start with an isClicked value of false.
        if (clickedCharacter[0].isClicked === true) {
            score = 0;
            clickMessage = "The round is over because you already clicked that character. You can start over if you want to."
            // Set the isClicked value for all characters to false.
            for (let i = 0; i < characters.length; i++) {
                characters[i].isClicked = false;
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the above changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});

        // If the isClicked value for the clicked character is fales, and if the number of correct clicks is less than 11, change the isClicked value for the clicked character to true, increase the scoree by 1, and display the appropriate message.
        } else if (score < 11) {
            clickedCharacter[0].isClicked = true;
            score++;
            clickMessage = "Click another character.";
            // If the score is more than the top score, change the top score to the score, and set the state for the top score.
            if (score > topScore) {
                topScore = score;
                this.setState({topScore});
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the above changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});

        // If the isClicked value for the clicked character is false, and if the number of correct clicks is equal to 11, change the isClicked value for the clicked character to true, reset the score to 0, and display the appropriate round over message.
        } else {
            clickedCharacter[0].isClicked = true;
            score = 0;
            clickMessage = "You've clicked all of the characters.";
            // Set the top score to 12, and set the state for the top score.
            topScore = 12;
            this.setState({topScore});
            // Set the isClicked value for all characters to false.
            for (let i = 0; i < characters.length; i++){
                characters[i].isClicked = false;
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the above changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});
        }
    };

    // Render the page section containing the title, messages, score, and top score, and the page section containing the characters.
    render() {
        return (
            <Wrapper>
                <Title>Simpsons Clicky Game
                <div>
                <h3 className="message">{this.state.clickMessage}</h3>
                <h3 className="scores">Your Current Score: {this.state.score}<br></br>Your Top Score: {this.state.topScore}</h3>
                </div>
                </Title>
                {this.state.characters.map(character => (
                    <CharacterCard
                        processClicked={this.processClicked}
                        id={character.id}
                        key={character.id}
                        image={character.image}
                    />
                ))}
            </Wrapper>
        );
    }
}


export default App;
