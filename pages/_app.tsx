import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import PagesLayout from "../components/PagesLayout";
import "antd/dist/antd.css";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PagesLayout>
        <Component {...pageProps} />
      </PagesLayout>
    </QueryClientProvider>
  );
}
export default MyApp;
