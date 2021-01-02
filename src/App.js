import './App.css';
import * as html2canvas from 'html2canvas';
import * as rasterizeHTML from 'rasterizehtml';


function App() {

  function printIdCard() {
    console.log('printing...');
    window.print();
  }

  function downloadIdCardAsImage() {
    console.log("Downloading....");
    const idCardContainer = document.body;
    html2canvas(idCardContainer, { 
      allowTaint: false, 
      backgroundColor: '#ffffff',
      removeContainer: true
    }).then((canvas) => {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "ID_Card.jpg";
      link.href = canvas.toDataURL();
      link.target = "_blank";
      link.click();
    });
  }

  function generateImage() {
    var node = document.getElementById('app');
    var canvas = document.createElement("canvas");
    canvas.height = node.offsetHeight;
    canvas.width = node.offsetWidth;
    var name = "IDCard.png";

    rasterizeHTML
      .drawHTML(node.innerHTML, canvas)
      .then(function (renderResult) {
        if (navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), name);
        } else {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = canvas.toDataURL();
          a.download = name;
          a.click();
          document.body.removeChild(a);
        }
      });


  }

  return (
    <div className="app-container" id="app">
      <h2 id="title" data-html2canvas-ignore="true">ID Card</h2>
      <div className="card" id="idCardContainer">
        <img src="img_avatar2.png" alt="Avatar" />
        <div className ="container">
          <h4>
            <b>Jane Doe</b>
          </h4>
          <p>Interior Designer</p>
          <p>B +ve</p>
          <p>901231232</p>
        </div>
      </div>
      <button className="button download-id-btn" onClick={downloadIdCardAsImage} data-html2canvas-ignore="true">Download Id</button>
      <button className="button print-id-btn" onClick={printIdCard} data-html2canvas-ignore="true">Print ID</button>
    </div>
  );
}

export default App;
