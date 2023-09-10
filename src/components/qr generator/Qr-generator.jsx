import React from "react";
// import logo from "../../assets/Museum transp (1).png";
import logo from '../../pages/images/Museum transp (1).png'
import QRCode from "qrcode.react";
import "./qr-generator-style.css";
export default function Qrgenerator({nombremuestra,museo, recorrido, muestra,acerca,modoMuseo,reco,tressesenta,historiadevida,gallery}) {
  console.log(nombremuestra)
  const qrData = {
    museo,
    recorrido,
    muestra,
    acerca,
    modoMuseo,
    reco,
    tressesenta,
    historiadevida:false,
    gallery:false,

  };
  console.log(qrData)
  const jsonString = JSON.stringify(qrData);
  
  const downloadQR = () => {
    
    const canvas = document.getElementById(muestra);
    
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${nombremuestra}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    
      <div className="QR-container">
        <p className="text-xl pb-4 font-bold">{nombremuestra}</p>
        <QRCode
          id={muestra}
          value={jsonString}
          size={378}
          level={"Q"}
          includeMargin={true}
          imageSettings={{
            src: logo,
            x: undefined,
            y: undefined,
            height: 60,
            width: 60,
            excavate: false,
          }}
        />
        <button className="download" onClick={downloadQR}> Download QR </button>
      </div>
    
  );
}
