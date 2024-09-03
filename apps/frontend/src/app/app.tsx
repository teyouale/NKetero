import { Route, Routes, Link } from 'react-router-dom';
import { AlertDemo } from './AlertDemo';
import { CalendarDemo } from './CalanderDemo';

export function App() {
  return (
    <div>
      <h1 className="bg-primary">Hello</h1>
      <AlertDemo />
      <div className="w-fit">
        <CalendarDemo />
      </div>
      {/* <NxWelcome title="frontend" /> */}
    </div>
  );
}

export default App;
