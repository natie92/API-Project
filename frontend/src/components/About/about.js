import "./about.css";

export default function About() {
  return (
    <div className="about-me-container">
      <div className="image-container">
        <img className="" src=""></img>
      </div>
      <div className="info-container">
        <div className="name-container">
          <h4>About Me</h4>
          <h1>Natalia Miller</h1>
          <h5>Full Stack Developer</h5>
          <p className="email">Email: nataliajoanmiller@gmail.com</p>
          <a href="">Github</a>
        </div>
        <div className="my-links"></div>
      </div>
    </div>
  );
}
