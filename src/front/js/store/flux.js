const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            resutadosBusqueda: []
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
                        alert("Usuario registrado con éxito ✅");
                        console.log("Nuevo usuario:", data.new_user_created);
                        setStore({ user: data.new_user_created });
                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                        alert(data.error || "Error al registrar el usuario");
                    }
                } catch (error) {
                    console.error("Error en el registro:", error);
                    alert("Ocurrió un error al intentar registrarse");
                }
            },

            login: async ({ email, password }) => {
                try {
                    console.log("Entramos a la funcion login...")
                    const response = await fetch(process.env.BACKEND_URL + "/api/log-in", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Usuario inicio sesion con éxito ✅");
                        //console.log(data);
                        // setStore({ userToken: data.token });
                        setStore({ ...setStore, userToken: data.token })
                        const store = getStore()
                        //console.log(store)

                        return data;
                    } else {
                        console.error("Error en la respuesta del servidor:", data);
                        alert(data.error || "Error al intentar iniciar sesion");
                    }
                } catch (e) {
                    console.log("Error", e)
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
                let store = getStore()
                localStorage.clear()
                setStore({ ...setStore, userToken: null })
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
                    setStore({...getStore(),resutadosBusqueda:data.result})
                } catch (error) {
                    console.log(error)
                }
            }
        },
    };
};

export default getState;
