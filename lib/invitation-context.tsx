"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface InvitationContextType {
  isOpened: boolean;
  openInvitation: () => void;
}

const InvitationContext = createContext<InvitationContextType>({
  isOpened: false,
  openInvitation: () => {},
});

export const InvitationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Kunci scroll body dan html jika undangan belum dibuka
    if (!isOpened) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Pastikan posisi scroll berada di paling atas saat terkunci
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpened]);

  const openInvitation = () => {
    setIsOpened(true);
  };

  return (
    <InvitationContext.Provider value={{ isOpened, openInvitation }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => useContext(InvitationContext);
