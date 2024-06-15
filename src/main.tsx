import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"

import "./App.css"
import "./index.css"
import App from "./App"
import "simplebar/src/simplebar.css"
import { store } from "./store/store"
import "./assets/third-party/apex-chart.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
)
