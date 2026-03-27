const DB = {
    // ESTA ES TU NUEVA URL DE GOOGLE CLOUD
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw24QKokbqbcmjgyz4pRT23g3ICzqcCmO-6t5k4mgdV4YMDBGEF2GrLu3vFXrripIWc/exec',

    // --- LOGIN ---
    async login(usuario, pass, rol) {
        const u = usuario.trim().toLowerCase();
        const p = pass.trim();
        const r = rol.trim().toLowerCase();

        // Enviamos la petición al script
        const url = `${this.SCRIPT_URL}?accion=login&usuario=${encodeURIComponent(u)}&pass=${encodeURIComponent(p)}&rol=${encodeURIComponent(r)}`;
        
        try {
            const response = await fetch(url);
            const res = await response.json();
            
            if (res.ok) {
                // Guardamos la sesión en el navegador
                sessionStorage.setItem('jr_user', JSON.stringify(res.user));
                return res.user;
            }
            return null;
        } catch (e) {
            console.error("Error en el login:", e);
            return null;
        }
    },

    // --- LEER DATOS ---
    async leer(hoja) {
        const url = `${this.SCRIPT_URL}?accion=leer&hoja=${hoja}`;
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            console.error("Error al leer:", e);
            return { ok: false, datos: [] };
        }
    },

    // --- GUARDAR NUEVOS DATOS (POST) ---
    async guardar(hoja, registro) {
        try {
            await fetch(this.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ accion: 'agregar', hoja: hoja, registro: registro })
            });
            return { ok: true };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    },

    // --- ACTUALIZAR DATOS (POST) ---
    async actualizar(hoja, id, cambios) {
        try {
            await fetch(this.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ accion: 'actualizar', hoja: hoja, id: id, cambios: cambios })
            });
            return { ok: true };
        } catch (e) {
            return { ok: false };
        }
    }
};
