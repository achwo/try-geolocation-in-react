import { usePosition } from "./geohook";
import './App.css';
import { useEffect, useState } from "react";

// const permissionsAvailable = "permissions" in navigator;

function App() {
  const { position, geoAvailable, error } = usePosition({ watch: true });
  const [ timer, setTimer ] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    console.log('This will run every second!', timer);
    setTimer(timer + 1);
  }, 1000);
  return () => clearInterval(interval);
}, [timer]);
  // const [ result, setResult] = useState(null);

  // useEffect(() => {
  //   if (!permissionsAvailable) {
  //     console.log("no permissions api");
  //     return
  //   }

  //   navigator.permissions.query({ name: "geolocation" }).then((r) => {
  //     setResult(r);
  //   });

  // }, [navigator.permissions, setResult]);

  // if (result) {
  //   console.log("result", result);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       { result.state }

  //     </header>
  //   </div>
  // );
  // }

  //   return (
  //   <div className="App">
  //     <header className="App-header">
  //       Position wird geladen
  //     </header>
  //   </div>
  //   );

  // if (!"permissions" in navigator) {
  //   return (
  //   <div className="App">
  //     <header className="App-header">
  //       Keine Permissions verfügbar
  //     </header>
  //   </div>
  //   );
  // }


  if (!geoAvailable) {
    return (
    <div className="App">
      <header className="App-header">
        Kein Geo verfügbar
      </header>
    </div>
    );
  }
  if (error) {
    console.error(error);
    return (
    <div className="App">
      <header className="App-header">
      { error.message }
      </header>
    </div>
    );
  }
  if (!position) {
    return (
    <div className="App">
      <header className="App-header">
        Position wird geladen
      </header>
    </div>
    );
  }
  const { coords: { latitude, longitude }, timestamp} = position;

  const url = `https://duckduckgo.com/?q=lat%3A+${latitude}++lng%3A+${longitude}&ia=web&iaxm=maps`

  return (
    <div className="App">
      <header className="App-header">
        <a href={url} target="_blank" rel="noreferrer">
          lat: {  position?.coords.latitude } lng: {  position?.coords.longitude }
        </a>
        <p>{timestamp}</p>
        <p>{new Date(timestamp).toLocaleString() }</p>
        <p>{new Date().toString() }</p>
    <p>{timer}</p>
      </header>
    </div>
  );
}

export default App;
