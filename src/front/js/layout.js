import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import PrivateRoute from "./component/PrivateRoute.jsx";
import { Navbar } from "./component/navbar";
//Herramientas
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";

// Vistas globales
import { Home } from "./pages/home";
import Registro from "./pages/registro";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.js";
import UserConfig from "./pages/userConfig.js";
import Sidebar from "./component/Sidebar.jsx";
import FreelancePerfil from "./pages/freelancePerfil.js";

// Vistas user
import ResutadoDeBusqueda from "./pages/ResutadoDeBusqueda.jsx";
import DetalladoDeOrden from "./pages/DetalladoDeOrden.jsx";
import Ordenes from "./pages/Ordenes.jsx";
import UserEdit from "./pages/userEdit.js";
import Favorites from "./pages/Favorites.jsx"


// Vistas freelance
import FreelanceTemplate from "./pages/freelanceTemplate.js";
import FreelanceDescrption from "./pages/freelanceDescripcion.js";
import FreelanceFormulario from "./pages/freelanceFormulario.js";
import FreelanceLayout from "./pages/freelanceLayout.js";

import FreelanceDashboard from "./pages/freelanceDashboard.js";

import AdminPage from "./pages/AdminPage.jsx";
import AllReports from "./pages/AllReports.jsx";







const initialOptions = {
    "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
    currency: "MXN",
    intent: "capture",
};



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <PayPalScriptProvider options={initialOptions}>

            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
    
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Registro />} path="/registro" />
                            <Route element={<Login />} path="/iniciar-sesion" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<UserConfig/>} path="/config"/>
                            <Route element={<FreelanceFormulario/>} path="/form"/>
                            <Route element={<FreelancePerfil />} path="/freelancePerfil/:freelance_id" />
                            <Route element={<ResutadoDeBusqueda />} path="/busqueda" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />

                            <Route path="/free" element={<PrivateRoute allowedRoles={["freelance"]}><FreelanceTemplate/></PrivateRoute>}>
                                
                                <Route element={<FreelanceDescrption />} path="cv" />
                                <Route element={ <FreelanceLayout />} path="layout" />
                            </Route>



                            {/* <Route element={<PrivateRoute allowedRoles={["user"]}><UserEdit/></PrivateRoute>} path="/userEdit" /> */}
                            <Route element={<PrivateRoute allowedRoles={["user"]}><DetalladoDeOrden /></PrivateRoute>} path="/detallado-de-orden" />
                            <Route element={<PrivateRoute allowedRoles={["user"]}><Ordenes /></PrivateRoute>} path="/ordenes" />
                            <Route element={<PrivateRoute allowedRoles={["user"]}><Favorites /></PrivateRoute>} path="/favoritos" />

                        </Routes>
                        {/* <Footer /> */}
                    </ScrollToTop>
                    <Toaster />
                </BrowserRouter>
            </div>

        </PayPalScriptProvider>
    );
};

export default injectContext(Layout);
