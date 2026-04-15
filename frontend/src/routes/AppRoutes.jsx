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
import AdminEventsList from "../pages/admin/AdminEventList";
import AdminEventForm from "../components/admin/AdminEventForm";
import AdminGalleryForm from "../pages/admin/AdminGalleryForm";
import Programs from "../pages/Programs";
import ProgramDetails from "../pages/ProgramsDetails";
import AdminProgramRegistrations from "../pages/admin/AdminProgram";
import Book from "../pages/Book";
import AdminBookPreorders from "../pages/admin/AdminPreOrder";
import FinanceForNonFinanceProgramme from "../pages/Finance";
import ProgrammePaymentVerify from "../pages/ProgramFinanceVerify";
import Events from "../pages/Events";
import EventLandingPage from "../pages/EventLandingPage";
import Gallery from "../pages/Gallery";
import AdminEventGalleriesList from "../pages/admin/AdminGallery";





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
        <Route path="/programs" element={<Programs/>}/>
        <Route path="/programs/:slug" element={<ProgramDetails/>}/>
        <Route path="/my-book" element={<Book/>}/>
        <Route path="/finance" element={<FinanceForNonFinanceProgramme/>}/>
        <Route path="/finance/verify" element={<ProgrammePaymentVerify/> }/>
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventLandingPage />} />
        <Route path="/gallery" element={<Gallery />} />



        
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
          <Route path="/admin/galleries" element={<AdminEventGalleriesList/>} />

         

          <Route path="/admin/events" element={<AdminEventsList />} />
          <Route path="/admin/events/new" element={<AdminEventForm />} />
          <Route path="/admin/events/:id/edit" element={<AdminEventForm />} />

          <Route path="/admin/galleries/new" element={<AdminGalleryForm />} />
          <Route
            path="/admin/galleries/:id/edit"
            element={<AdminGalleryForm />}
          />
          <Route
            path="/admin/programs"
            element={<AdminProgramRegistrations />}
          />
       <Route path="/admin/book-preorders" element={<AdminBookPreorders />} />
          
        </Route>
      </Route>


        
    </Routes>
  );
}