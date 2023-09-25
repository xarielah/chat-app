import Layout from "./layout/layout";
import StateProvider from "./components/providers/state.provider";
import AppWrapper from "./screens/app-wrapper";
const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
const socketServer = import.meta.env.VITE_SOCKET_SERVER ?? "localhost:6969";
export const socket = new WebSocket(`${wsProtocol}://${socketServer}`);

function App() {
  return (
    <StateProvider>
      <Layout>
        <AppWrapper />
      </Layout>
    </StateProvider>
  );
}

export default App;
