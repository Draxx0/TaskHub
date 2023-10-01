import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import firebaseService from "./service/firebase.service";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    firebaseService.getFirebaseCollection({
      collection: "workshops",
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
