import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";

const mapStyleURL = "mapbox://styles/mapbox/satellite-streets-v11";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addLogEntry, setAddLogEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const showLogEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    showLogEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddLogEntry({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={mapStyleURL}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              className="popup"
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup-content">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited at: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
                <img className="location-pic" src={entry.image} alt="" />
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addLogEntry ? (
        <>
          <Marker
            latitude={addLogEntry.latitude}
            longitude={addLogEntry.longitude}
          >
            <div>
              <svg
                className="marker orange"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`,
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            className="popup"
            latitude={addLogEntry.latitude}
            longitude={addLogEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddLogEntry(null)}
            anchor="top"
          >
            <div>
              <LogEntryForm
                location={addLogEntry}
                onClose={() => {
                  setAddLogEntry(null);
                  showLogEntries();
                }}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
