
import React from "react";
import ReactDOM from "react-dom";
import Cube from './Cube'

// Composant principal contenant la possibilité de monter et démonter notre projet three.js.
class Container extends React.Component {
  state = { isMounted: true };

  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Démonter" : "Monter"}
        </button>
        {isMounted && <Cube />}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);
