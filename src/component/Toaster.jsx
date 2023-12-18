// Import statements...

import { Toaster } from "react-hot-toast";
import "./style/ToasterComp.css"; // Import the CSS file

export default function ToasterComp() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 1300,
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid ",
        },

        // Default options for specific types
        success: {
          duration: 1300,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
}