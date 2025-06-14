"use client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
export default function AuthCallback() {
    const { handleRedirectCallback, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function processAuth() {
            try {
                if (isAuthenticated) {
                    // console.log("User already authenticated. Redirecting...");
                    router.push("/home");
                    return;
                }

                if (window.location.search.includes("code=")) {
                    // Handle the Auth0 redirect
                    await handleRedirectCallback();

                    // Get the access token
                    const token = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                        },
                    });

                    if (token) {
                        localStorage.setItem("access_token", token);
                        router.push("/home");
                    }
                }
            } catch (error) {
                console.error("Auth0 Callback Error:", error);
            } finally {
                setLoading(false);
            }
        }

        processAuth();
    }, [handleRedirectCallback, getAccessTokenSilently, isAuthenticated, router]);

    return (
        <div className="flex justify-center flex-col relative space-y-5 items-center min-h-screen">
            {/* Blurry Decorative Element */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C767] opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#03624C] opacity-20 rounded-full blur-3xl"></div>

            <div className="flex justify-center">
                <Image src="/logo.jpg" width={200} height={300} alt="Welcome" />
            </div>
            {loading ? (
                <div className="flex flex-col items-center space-y-4">
                    <FaSpinner className="animate-spin text-green-600 text-4xl" />
                    <p className="text-gray-700 text-lg font-medium">Processing login...</p>
                </div>
            ) : (
                <p className="text-gray-700 text-lg font-medium">Redirecting...</p>
            )}
        </div>
    );
}
