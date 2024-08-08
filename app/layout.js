import { Inter } from "next/font/google";
import Providers from '../redux/slices/Provider';
import "../public/boostrap/css/bootstrap.min.css";
import "../public/boostrap/css/font-awesome.min.css";
import "../public/boostrap/css/jquery-ui.min.css";
import "../public/boostrap/css/elegant-icons.css";
import "../public/boostrap/css/nice-select.css";
import "../public/boostrap/css/slicknav.min.css";
import "../public/boostrap/css/style.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import Header from "./header";
import Footer from "./footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web bán gì đó",
  description: "Tạo bởi tui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>  
        <body className={inter.className}>
          <Header/>
            {children}
          <Footer/>
          <script src="../public/boostrap/js/main.js"></script>
          <script src="../public/boostrap/js/bootstrap.min.js"></script>
          <script src="../public/boostrap/js/jquery.min.js"></script>
          <script src="../public/boostrap/js/jquery-3.3.1.min.js"></script>
          <script src="../public/boostrap/js/jquery-ui.min.js"></script>
          <script src="../public/boostrap/js/popper.min.js"></script>
          <script src="../public/boostrap/js/jquery.slicknav.js"></script>
        </body>
      </Providers>  
    </html>
  );
}