import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.name = profile?.name;
                token.email = profile?.email;

                try {
                    // Asegúrate de que los nombres de los campos coincidan con lo que la API espera
                    
                    const response = await axios.post("http://127.0.0.1:8000/auth/login/google", {

                    // const response = await axios.post("https://apianemia.onrender.com/auth/login/google", {
                        nombre: profile?.name,       // Campo esperado por la API
                        access_token: account.access_token, // Campo esperado por la API
                    });
                    console.log("API response:", response.data);

                    // Extraer el ID de la respuesta de la API
                    const userId = response.data.id;

                    // Construir la URL con el ID extraído
                    const responseApoderadoByUsuario = await axios.get(`http://127.0.0.1:8000/apoderados/usuario/${userId}`);

                    // const responseApoderadoByUsuario = await axios.get(`https://apianemia.onrender.com/apoderados/usuario/${userId}`);
                    console.log("API response for Apoderado by Usuario:", responseApoderadoByUsuario.data);

                    token.idApoderado = responseApoderadoByUsuario.data.id;

                    console.log("El id apoderado es : " + token.idApoderado)

                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error("Error sending user data to API:", error.response?.data || error.message);
                    } else {
                        console.error("An unexpected error occurred:", error);
                    }
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.idToken = token.idToken;
            session.user = {
                ...session.user,
                name: token.name,
                email: token.email,
            };
            
            session.idApoderado = token.idApoderado;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
