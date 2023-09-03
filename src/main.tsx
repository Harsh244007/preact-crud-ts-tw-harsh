import { render } from "preact";
import { useState } from "preact/hooks";
import { Suspense } from "preact/compat";
import { Home, Navbar, Loading, JsonServer, Todo } from "./components";
import "./index.css";

const App = () => {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 2:
        return <Todo />;
      case 3:
        return <JsonServer />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-5">
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="py-4 w-auto overflow-auto px-6 max-w-3xl m-auto">
        <Suspense fallback={<Loading />}>{renderActiveComponent()}</Suspense>
      </div>
      <p>Made by Harsh with ❤️</p>
    </div>
  );
};
render(<App />, document.body);
