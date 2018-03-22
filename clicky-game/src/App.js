// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

// The above lines came with the install



import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Title from "./components/Title";
import characters from "./characters.json";
import Wrapper from "./components/Wrapper";
import './App.css';

let score = 0;
let topScore = 0;
let clickMessage = "Click an image to score a point, but if you click an image more than once, you lose all your points." 

class App extends Component {
    state = {
        characters,
        score,
        clickMessage,
        topScore
    };

     setClicked = id => {
        // Create a const for all characters and for a clicked character.
        const characters = this.state.characters;
        const clickedCharacter = characters.filter(character => character.id === id);
        // If the isClicked value for the clicked character is true, decrease the score to 0, and display the appropriate game over message.
        if (clickedCharacter[0].isClicked) {
            score = 0;
            clickMessage = "The game is over because you already clicked that character. You can start over if you would like to."
            // Set the isClicked value for all characters to false.
            for (let i = 0; i < characters.length; i++) {
                characters[i].isClicked = false;
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});
        // If the isClicked value for the clicked character is fales, and if the number of correct clicks is less than 12, change the isClicked value for the clicked character to true, increase the scoree by 1, and display the appropriate message.
        } else if (score < 12) {
            clickedCharacter[0].isClicked = true;
            score++;
            clickMessage = "Click another character.";
            // If the score is more than the top score, change the top score to the score.
            if (score > topScore) {
                topScore = score;
                this.setState({topScore});
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});
        // If the isClicked value for the clicked character is false, and if the number of correct clicks is equal to 12, change the isClicked value for the clicked character to true, reset the score to 0, and display the appropriate game over message.
        } else {
            clickedCharacter[0].isClicked = true;
            score = 0;
            clickMessage = "You've clicked all of the characters";
            // If the score is more than the top score, change the top score to the score.
            if (score > topScore) {
                topScore = score;
                this.setState({topScore});
            }
            // Set the isClicked value for all characters to false.
            for (let i = 0; i < characters.length; i++){
                characters[i].isClicked = false;
            }
            // Shuffle the character images.
            characters.sort(function(a, b){return 0.5 - Math.random()});
            // Set the state for the changed values.
            this.setState({characters});
            this.setState({score});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Clicky Game
                <h3 className="message">{this.state.clickMessage}</h3>
                <h3 className="scores">Score: {this.state.score}<br></br>Your Top Score: {this.state.topScore} 
                </h3>
                </Title>

                {this.state.characters.map(character => (
                    <CharacterCard
                        setClicked={this.setClicked}
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
