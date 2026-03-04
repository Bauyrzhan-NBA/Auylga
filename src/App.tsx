import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import News from './pages/News';
import Contacts from './pages/Contacts';
import PageView from './pages/Page';
import BusinessPrograms from './pages/BusinessPrograms';
import ProgramSDiplomomVSelo from './pages/ProgramSDiplomomVSelo';
import ProgramsMobilnost from './pages/ProgramsMobilnost';
import ProgramOdinAulOdinProduct from './pages/ProgramOdinAulOdinProduct';
import PageGranty from './pages/PageGranty';
import PageSocialPrograms from './pages/PageSocialPrograms';
import PageZhilyo from './pages/PageZhilyo';
import PagePredprinimatelstvo from './pages/PagePredprinimatelstvo';
import PagePriglashayushchieSela from './pages/PagePriglashayushchieSela';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNews from './pages/AdminNews';
import './App.css';

const PublicLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-[#f8fafc] min-h-[100dvh]">
    <Header />
    <main className="flex-grow w-full overflow-x-hidden">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes — no header/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />

        {/* Public Routes — wrapped with header/footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/kasipkerlikti-damytu" element={<BusinessPrograms />} />
          <Route path="/s-diplomom-v-selo" element={<ProgramSDiplomomVSelo />} />
          <Route path="/programmy-mobilnosti" element={<ProgramsMobilnost />} />
          <Route path="/odin-aul-odin-product" element={<ProgramOdinAulOdinProduct />} />
          <Route path="/memlekettik-granttar" element={<PageGranty />} />
          <Route path="/granty" element={<PageGranty />} />
          <Route path="/socialnye-programmy" element={<PageSocialPrograms />} />
          <Route path="/zhilyo" element={<PageZhilyo />} />
          <Route path="/predprinimatelstvo" element={<PagePredprinimatelstvo />} />
          <Route path="/specialisty-v-selah" element={<ProgramSDiplomomVSelo />} />
          <Route path="/priglashayushchie-sela" element={<PagePriglashayushchieSela />} />
          <Route path="/:slug" element={<PageView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

