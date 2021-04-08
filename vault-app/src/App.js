import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer";
import Container from "./layout/Container";

function App() {
  return (
    <Router>
      <Navbar />
      <Container />
      <Footer />
    </Router>
  );
}

export default App;
