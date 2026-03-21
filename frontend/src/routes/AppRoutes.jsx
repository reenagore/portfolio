import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import PaymentVerify from "../pages/PaymentVerify";
import PublicLayout from "../components/layout/PublicLayout";
import AdminLogin from "../components/admin/AdminLogin";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../components/layout/AdminLayout";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminArticles from "../pages/admin/AdminArticles";
import AdminPodcasts from "../pages/admin/AdminPodcast";
import AdminPayments from "../pages/admin/AdminPayment";
import AdminArticleForm from "../components/admin/ArticleForm";
import AdminPodcastForm from "../components/admin/PodcastForm";
import About from "../pages/About";
import FpoMethod from "../pages/FpoMethod";
import Services from "../pages/Services";
import Podcast from "../pages/Podcast";
import Insights from "../pages/Insights";
import Contact from "../pages/Contact";
import TermsOfService from "../pages/Terms";
import PrivacyPolicy from "../pages/Privacy";
import LandingPagesIndex from "../components/admin/LandinPageIndex";
import AdminLandingPagesList from "../pages/admin/AdminLandingPageList";
import AdminLandingPageForm from "../components/admin/AdminLandingPageForm";
import EventLandingPage from "../pages/admin/EventLanding";
import ProductLandingPage from "../pages/ProductPage";
import GalleryLandingPage from "../pages/Gallery";



export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/fpo-method" element={<FpoMethod/> }/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/podcast" element={<Podcast/>}/>
        <Route path="/insights" element={<Insights/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/events/:slug" element={<EventLandingPage />} />
        <Route path="/products/:slug" element={<ProductLandingPage />} />
        <Route path="/galleries/:slug" element={<GalleryLandingPage />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminArticleForm />} />
          <Route path="/admin/articles/:id/edit" element={<AdminArticleForm />} />
          <Route path="/admin/podcasts" element={<AdminPodcasts />} />
          <Route path="/admin/podcasts/new" element={<AdminPodcastForm />} />
          <Route path="/admin/podcasts/:id/edit" element={<AdminPodcastForm />} />

          <Route path="/admin/landing-pages" element={<LandingPagesIndex />} />
          <Route
            path="/admin/landing-pages/events"
            element={<AdminLandingPagesList forcedType="event" />}
          />
          <Route
            path="/admin/landing-pages/products"
            element={<AdminLandingPagesList forcedType="product" />}
          />
          <Route
            path="/admin/landing-pages/galleries"
            element={<AdminLandingPagesList forcedType="gallery" />}
          />
          <Route path="/admin/landing-pages/new" element={<AdminLandingPageForm />} />
          <Route
            path="/admin/landing-pages/:id/edit"
            element={<AdminLandingPageForm />}
          />
        </Route>
      </Route>


        
    </Routes>
  );
}