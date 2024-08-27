"use client"
import React, { useState, useContext } from 'react'
import { AuthContext } from "./authProvider";

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
