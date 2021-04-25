import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import Navigation from './Files/Navigation';

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Navigation/>
  )
}

