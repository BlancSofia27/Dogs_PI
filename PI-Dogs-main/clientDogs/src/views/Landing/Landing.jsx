
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className='styles.landing'>
      <div className='container'>
        <h1>Find thousands of recipes!</h1>
        <NavLink to="/home">
          <button>go</button>
        </NavLink>
      </div>
    </div>
  );
}
