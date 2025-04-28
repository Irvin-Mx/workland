const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try{
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                }catch(error){
                    console.log("Error loading message from backend", error)
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },
            signup: async ({ name, last_name, email, password, phone, rol, address }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/registro", {
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
        }
    };
};

export default getState;
