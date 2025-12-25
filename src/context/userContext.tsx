"use client";
import React, { createContext, useEffect, useState } from "react";

export const userContext = createContext<any>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [profilePic, setProfilePic] = useState<String>("");

    return (
        <userContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, profilePic, setProfilePic }}>
            {children}
        </userContext.Provider>
    );
}