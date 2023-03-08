import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./pages/Map";
import LGglance from "./pages/LGglance";
import LGglanceDetails from "./pages/LGglanceDetails";
import SearchByCategory from "./pages/SearchByCategory";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import CreateOffice from "./pages/CreateOffice";
import InfoCollection from "./pages/InfoCollection";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import ScrollToTop from "./utils/ScrollToTop";
import NotFound from "./pages/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "react-page-loading";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { useStateValue } from "./utils/StateProvider";
import SelfAssessmentForm from "./pages/SelfAssessmentForm";
import Results from "./pages/Results";
import SingleArticle from "./pages/SingleArticle/SingleArticle";
import SingleDocument from "./pages/SingleDocument";
import InformationDetails from "./pages/InformationDetails";
import InformaionList from "./pages/InformationList";
import InformaionResults from "./pages/InformationResults";
import Notification from "./pages/Notification";
import "nepali-datepicker-reactjs/dist/index.css";

function App() {
  const [{ loading }] = useStateValue();
  // console.log = function () {};
  return (
    <LoadingOverlay
      active={loading}
      spinner={<PulseLoader color="#1f8cd5" />}
      text={"लोड हुँदैछ"}
    >
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/test" element={<Map />} />
          <Route path="/lg-glance" element={<LGglance />} />
          <Route path="/lg-glance/:lgId" element={<LGglanceDetails />} />
          <Route path="/advance_search" element={<SearchByCategory />} />
          <Route path="/results" element={<Results />} />
          <Route path="/article/:id" element={<SingleArticle />} />
          <Route path="/document/:id" element={<SingleDocument />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offices"
            element={
              <ProtectedRoute>
                <CreateOffice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/information-collection-section"
            element={
              <ProtectedRoute>
                <InfoCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/information-collection-detail/:id"
            element={
              <ProtectedRoute>
                <InformationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/information-collection-detail/list/:id"
            element={
              <ProtectedRoute>
                <InformaionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/information-collection-results/:id"
            element={
              <ProtectedRoute>
                <InformaionResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/self-assessment-form/:information_id"
            element={
              <ProtectedRoute>
                <SelfAssessmentForm />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LoadingOverlay>
  );
}

export default App;
