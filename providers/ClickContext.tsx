"use client";
import { createContext, useContext, useState } from "react";

type Click = {
  clicked: boolean;
  setClicked: (value: boolean) => void;
};

const ClickContext = createContext<Click>({
  clicked: false,
  setClicked: () => {},
});
export default function ClickProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <ClickContext.Provider value={{ clicked, setClicked }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClick() {
  return useContext(ClickContext);
}
