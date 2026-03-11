import { Link } from "react-router-dom";

function Footer(){

  return(

    <footer className="footer">

      <p>© 2026 BookStore</p>

      <div>
        <Link to="/terms">Terms</Link>
      </div>

    </footer>

  );

}

export default Footer;