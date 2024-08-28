"use client";

import React, { useContext, useState } from "react";

import { AuthContext } from "./authProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
