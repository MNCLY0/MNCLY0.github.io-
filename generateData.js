require("dotenv").config();
const fs = require("fs");
const fetch = require("node-fetch");

const token = process.env.GITHUB_TOKEN;
const username = 'MNCLY0';

const headers = {
  Authorization: `token ${token}`,
  "User-Agent": "GitHubDataFetcher"
};

async function fetchGitHubData() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos`, { headers })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("Error al obtener datos de GitHub");
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    fs.writeFileSync("profile.json", JSON.stringify(user, null, 2));
    fs.writeFileSync("repos.json", JSON.stringify(repos, null, 2));

    console.log("✅ Datos guardados como profile.json y repos.json");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchGitHubData();