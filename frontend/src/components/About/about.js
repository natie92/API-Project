import "./about.css";
import profile from "./blue-girl.JPG";



export default function About() {
  return (
    <div className="about-me-container">
      <div className="info-container">
          <div className="image-container">
            <img className="photo-of-nat" src={profile} alt="profile-photo"></img>
          </div>
        <div className="name-container">
          <h1 className="about-me">About Me</h1>
          <h2 className="full-name">Natalia Miller</h2>
          <h4 className="title">Full Stack Developer</h4>
          <p className="about-me-info" >
          I'm a Full Stack Developer based in New York, and currently am in the process of finishing the App Academy bootcamp. I feel really excited to share with you my first big project!
          </p>
          <p className="email-about">Email: nataliajoanmiller@gmail.com</p>
          <div className="my-links">
          <a href="https://github.com/natie92" className="github">Github</a>
          <a href="https://www.linkedin.com/in/natalia-miller-29617a98/" className="linked-in">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
