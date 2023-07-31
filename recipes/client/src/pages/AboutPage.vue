<template>
  <div class="about-page">
    <div class="box">
      <div class="about-section">
        <h1 class="about-title">About Us</h1>
        <div class="about-description">
          <p>
            We are two students passionate about cooking and technology. Our
            goal is to provide food enthusiasts with a platform to discover and
            explore delicious recipes from around the world.
          </p>
          <p>
            This web app utilizes the Spoonacular API, which allows us to fetch
            a wide variety of recipes and provide users with personalized search
            options based on their dietary preferences and restrictions.
          </p>
          <p>
            Through this project, we aim to make cooking more accessible and
            enjoyable for everyone, whether you're a beginner or an experienced
            chef. We hope you find inspiration and delight in the culinary
            journey we've created.
          </p>
        </div>
      </div>
      <div class="developers-section">
        <h2 class="developers-title">Meet the Developers</h2>
        <div class="developer">
          <div class="developer-image">
            <img
              src="https://pbs.twimg.com/profile_images/1337383329092542464/KtwzaP1Z_400x400.jpg"
              alt="Ido Lourie"
            />
          </div>
          <div class="developer-info">
            <h3 class="developer-name">Ido Lourie</h3>
            <p class="developer-description">
              3rd year student at Ben Gurion University of the Negev, studying
              Information Systems Engineering.
            </p>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/in/ido-lourie/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/idolou"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="developer">
          <div class="developer-image">
            <img
              src="https://media.licdn.com/dms/image/C4D03AQGU1KBxYr2J5g/profile-displayphoto-shrink_200_200/0/1650380339601?e=1695254400&v=beta&t=1p0zZsFLF5UBu3JWXuTd_zy8GI8IfJTPmO4OSWCg5f4"
              alt="Ido Lourie"
            />
          </div>
          <div class="developer-info">
            <h3 class="developer-name">Elad Shmulevich</h3>
            <p class="developer-description">
              3rd year student at Ben Gurion University of the Negev, studying
              Information Systems Engineering.
            </p>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/in/elad-shmulevich-information-system-engineering/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/EladShmulevich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="previous-projects-section">
          <h2 class="previous-projects-title">Previous Projects</h2>
          <ul class="previous-projects-list">
            <li class="previous-project">
              <h3
                class="previous-project-title"
                href="https://idolou.github.io/"
              >
                <a
                  href="https://idolou.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Space Invaders Web Game</a
                >
              </h3>

              <p class="previous-project-description"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  padding-top: 2em;
}

.box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2rem;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(141, 184, 133, 0.1),
    rgba(99, 158, 88, 0.1)
  );
  border-radius: 10px;
  width: 70%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
}

.about-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.about-description {
  line-height: 1.5;
  font-size: 1.3rem;
  width: 70%;
}

.developers-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.developer {
  display: flex;
  align-items: center;
  padding: 1em;
  margin-bottom: 1rem;
}


.developer-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%; /* Add this line to make the image circular */

}

.developer-info {
  flex-grow: 1;
}

.developer-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding-left: 1em;
}

.developer-description {
  line-height: 1.5;
  padding-left: 1em;
  font-size: 1.3rem;
}

.social-icons {
  margin-top: 0.5rem;
  padding-left: 1em;
}

.social-icons a {
  margin-right: 0.5rem;
  color: #000;
}

.social-icons i {
  font-size: 1.5rem;
}

.previous-projects-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.previous-projects-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  color: #000;
}

.previous-project {
  margin-bottom: 1rem;
}

.previous-project-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.previous-project-description {
  line-height: 1.5;
}

a:link {
  color: rgb(36, 49, 36);
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: rgb(8, 75, 19);
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: rgb(65, 57, 57);
  background-color: transparent;
  text-decoration: underline;
}
</style>
