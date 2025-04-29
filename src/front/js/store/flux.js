const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
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

            login: async ({name,email }) => {
                try{
                    const response = await fetch(process.env.BACKEND_URL + "/api/log-in", {
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
                }catch(e){
                    console.log("Error", e)
                }
            },
            checkLogInUser:()=>{
                let token = localStorage.getItem("user_token");
    
                if(token==null){
                    return false
                }else{
                    return true
                }
            }
        },
    };
};

export default getState;
