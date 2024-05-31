import './App.css';
import React from 'react'

function Formatter({ text, value, config }) {
  const [formatValue, setFormatValue] = React.useState("")
  const [formatText, setFormatText] = React.useState("")

  React.useEffect(() => {
    formattedText(text);
    formattedValue(value);
  }, [text, value]);

  function formattedValue(value) {
    if (value < 1000) {
      setFormatValue(Math.round(value));
    } else if (value >= 1000 && value < 1_000_000) {
      setFormatValue((value / 1000).toFixed(1).replace(/\.0$/, "") + "K");
    } else if (value >= 1_000_000 && value < 1_000_000_000) {
      setFormatValue((value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M");
    }
  }

  function formattedText(text) {
    let max = 5;
    if (text.length > config.maxTextLength) {
      max = config.maxTextLength
    }
    setFormatText(text.slice(0, max) + '...')

  }

  function showTooltip() {

    if (config.showUnformatted === true) {
      const tooltip = document.querySelector(".tooltip");
      tooltip.style.display = "block";
    }
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    tooltip.style.display = "none";
  }

  const textDiv = document.getElementById("text");
  textDiv?.addEventListener("mouseover", showTooltip);
  textDiv?.addEventListener("mouseout", hideTooltip);

  const valueDiv = document.getElementById("value");
  valueDiv?.addEventListener("mouseover", showTooltip);
  valueDiv?.addEventListener("mouseout", hideTooltip);

  return (
    <div>
      <div id="text" data-testid="text"> <span class="tooltip">{`${text} : ${value}`}</span>{formatText}</div>
      <div id="value" data-testid="value">  {formatValue}</div>

    </div>
  );
}

const App = () => {
  const config = {
    maxTextLength: 8,
    showUnformatted: true
  }

  return (
    <div>
      <Formatter config={config} text="hello world" value={2587645} />
    </div>
  )
}

export default App;
