import { toastExito, toastFallo } from "../component/Toaster/toasterIndex.jsx";
import { useSearchParams } from 'react-router-dom';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            resutadosBusqueda: [],
            userProfile: {},
            terminoBusqueda: ""
        },
        actions: {
            signup: async ({ name, last_name, email, password, phone, rol, address }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/sign-up", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, last_name, email, password, phone, rol, address })
                    });

                    const data = await response.json();

                    if (response.ok) {

                        setStore({ user: data.new_user_created });
                        return data;
                    } else {
                        // console.error("Error en la respuesta del servidor:", data);
                        toastFallo("Error al registrar el usuario")
                        // alert(data.error || "Error al registrar el usuario");
                    }
                } catch (error) {
                    console.error("Error en el registro:", error);
                    // alert("Ocurrió un error al intentar registrarse");
                    toastFallo("Error al registrar el usuario")
                }
            },
            login: async ({ email, password }) => {
                try {
                    // console.log("Entramos a la funcion login...")
                    const response = await fetch(process.env.BACKEND_URL + "/api/log-in", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        toastExito("Usuario inicio sesion con éxito ✅")
                        // alert("Usuario inicio sesion con éxito ✅");
                        console.log(data);
                        // setStore({ userToken: data.token });
                        const store = getStore()
                        localStorage.setItem("user_token", data.token);
                        setStore({ ...store, userProfile: data.user_info })

                        //console.log(store)

                        return data;
                    } else {
                        toastFallo("Error al intentar iniciar sesion")
                        console.error("Error en la respuesta del servidor:", data);
                        // alert(data.error || "Error al intentar iniciar sesion");
                    }
                } catch (e) {
                    console.log("Error", e)
                }
            },
            getMyProfile: async () => {
                try {
                    const token = localStorage.getItem("user_token");


                    const response = await fetch(process.env.BACKEND_URL + "/api/user", {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {

                        setStore({ ...getStore(), userProfile: data });
                        return data;
                    } else {

                        console.error("Error al obtener los datos del usuario", data);
                        alert(data.error || "Error al obtner el perfil de usuario");
                        return null;

                    }
                } catch (e) {
                    console.error("Error en la solicitus para obtener el perfil de usuario", error);
                    alert("Ocurrio un error al obtener los datos del perfil freelance");
                    return null;
                }
            },

            checkLogInUser: () => {
                let token = localStorage.getItem("user_token");

                if (token == null) {
                    return false
                } else {
                    return true
                }
            },

            logOut: () => {
                localStorage.removeItem("user_token");
                setStore({ ...getStore(), userProfile: {} })

            },
            busquedaFreelancers: async (busqueda) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(busqueda)
                    });


                    const data = await response.json()
                    setStore({ ...getStore(), resutadosBusqueda: data.result })
                } catch (error) {
                    console.log(error)
                }
            },
            changeSearchTerm: (term) => {
                if (term !== false) {
                    setStore({ ...getStore(), terminoBusqueda: term })
                }
                if (term == false) {
                    setStore({ ...getStore(), terminoBusqueda: "" })
                }
            },

                 
            createProduct: async (productData) => {
                const token = localStorage.getItem("user_token");



                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/service", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify(productData)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Producto agregado correctamente ✅");
                        console.log("Producto creado:", data.new_product_created);
                        // const store = getStore();
                        // setStore({ ...store, products: [...(store.products || []), data.new_product_created] });
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                        alert(data.error || "Error al agregar producto");
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                    alert("Ocurrió un error al intentar añadir producto");
                }
            },


            getMyFreelanceProfile: async (freelance_id) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/freelance/${freelance_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            // Incluye el token si es necesario
                            "Authorization": "Bearer " + localStorage.getItem("user_token")
                        }
                    });
            
                    const data = await response.json();
            
                    if (response.ok) {
                        // Almacena los datos en el estado global
                        const store = getStore();
                        setStore({ ...store, freelancerProfile: data });
            
                        return data; // Devuelve los datos si es necesario
                    } else {
                        console.error("Error al obtener los datos del usuario:", data);
                        alert(data.error || "Error al obtener el perfil de usuario");
                        return null;
                    }
                } catch (e) {
                    console.error("Error en la solicitud para obtener el perfil de usuario:", e);
                    alert("Ocurrió un error al obtener los datos del perfil freelance");
                    return null;
                }
            }
   


            getSingleService: async (serviceId) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/service/${serviceId}`);

                    const data = await response.json();

                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },
            createOrder: async (body) => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/create-order`, {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    });
                    const data = await response.json();
                    console.log(data)

                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            },
            getOrders:async () => {
                const token = localStorage.getItem("user_token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + `/api/order`, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token,
                        },
                    });
                    const data = await response.json();
                    console.log(data)

                    if (response.ok) {
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                    }
                } catch (error) {
                    console.error("Error al agregar producto:", error);
                }
            }
        },
    };
};

export default getState;
