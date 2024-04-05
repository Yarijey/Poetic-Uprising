import ReactDom from "react-dom/client"

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<>
<nav> some nav element</nav>
<main> some main element </main>
<footer> maybe footer element's here </footer>
</>
);