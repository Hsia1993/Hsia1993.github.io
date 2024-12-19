import { useCallback, useMemo, useState } from "react";

import CLI from "../components/CLI";
import PDFViewer from "../components/PDFViewer";
import AppContainer from "../components/AppContainer";
const applications = [
  {
    name: "Terminal",
    Component: CLI,
    icon: "/icons/terminal.png",
  },
  {
    name: "Phil.Xia_SDE",
    Component: PDFViewer,
    icon: "/icons/pdf.png",
  },
];

interface Application {
  id: number;
  name: string;
}
let id = 0;
const useApp = () => {
  const [runningApplications, setRunningApplications] = useState<Application[]>(
    []
  );
  const [activeApp, setActiveApp] = useState("");
  const onOpenApp = useCallback(
    (name: string) => {
      if (!runningApplications.find((app) => app.name === name)) {
        setRunningApplications((state) => [...state, { id: id++, name }]);
      }
    },
    [runningApplications]
  );
  const IconGroups = useMemo(() => {
    return applications.map(({ name, icon }) => (
      <div
        className="app-icon"
        key={name}
        onClick={() => {
          onOpenApp(name);
          setActiveApp(name);
        }}
      >
        <img src={icon} alt={name} />
        <span>{name}</span>
      </div>
    ));
  }, [onOpenApp]);
  const ActiveApps = useMemo(() => {
    return (
      <>
        {runningApplications.map(({ name }, idx) => {
          const Comp = applications.find((c) => c.name === name)?.Component;
          return (
            Comp && (
              <AppContainer
                key={name}
                title={name}
                onCloseApp={() => {
                  setRunningApplications((state) => {
                    return state.filter((_, _idx) => idx !== _idx);
                  });
                }}
                zIndex={name == activeApp ? 99 : 0}
                onActiveApp={() => {
                  setActiveApp(name);
                }}
              >
                <Comp />
              </AppContainer>
            )
          );
        })}
      </>
    );
  }, [runningApplications, activeApp]);
  return {
    IconGroups,
    runningApplications,
    ActiveApps,
  };
};
export default useApp;
