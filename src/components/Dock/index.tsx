import "./dock.css";
const Dock = () => {
  const dockItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📂", label: "Files" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📝", label: "Notes" },
    { icon: "🔍", label: "Search" },
  ];

  return (
    <div className="dock-container">
      <div className="dock">
        {dockItems.map((item, index) => (
          <div key={index} className="dock-item">
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
