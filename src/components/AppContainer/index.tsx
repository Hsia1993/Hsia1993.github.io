import { useState } from "react";
import "./appContainer.css";

function AppContainer({
  children,
  title,
  onCloseApp,
  zIndex,
  onActiveApp,
}: {
  children: React.ReactNode;
  title: string;
  zIndex: number;
  onCloseApp: () => void;
  onActiveApp: () => void;
}) {
  // const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  const handleMinimize = () => {
    // setIsMinimized(true);
  };
  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(previousPosition);
    } else {
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  const [position, setPosition] = useState(() => ({
    x: window.innerWidth / 2 - 250,
    y: window.innerHeight / 2 - 300,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onActiveApp();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: isMaximized ? "100%" : undefined,
        zIndex,
        height: isMaximized ? "100vh" : undefined,
      }}
      className={`appContainer`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="appContainer-header"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="appContainer-buttons">
          <span
            className="appContainer-button close"
            onClick={onCloseApp}
          ></span>
          <span
            className="appContainer-button minimize"
            onClick={handleMinimize}
          ></span>
          <span
            className="appContainer-button maximize"
            onClick={handleMaximize}
          ></span>
        </div>
        <div className="appContainer-title">{title} </div>
      </div>
      {children}
    </div>
  );
}

export default AppContainer;
