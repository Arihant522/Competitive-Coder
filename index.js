let userhandle = "";
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("setLeetcode").addEventListener("click", getLeetcode);
  document.getElementById("setCodeforces").addEventListener("click", getCodeforces);

});
function getLeetcode() {
  let leetcode = document.getElementById("Leetcode");
  const Leetcode_id = document.getElementById("leetcodeuser_id");
  userhandle = Leetcode_id.value;
  if (userhandle == "") {
    alert("Enter a valid username");
    return;
  }
  fetch(`https://leetcode-stats-api.herokuapp.com/${userhandle}/`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status == "error") {
        alert(data.message);
        return;
      }
      if(localStorage.getItem("leetcode")==null)
      {
        localStorage.setItem("leetcode",JSON.stringify(userhandle));
        console.log(localStorage.getItem("leetcode"));
      }
      else{
        console.log(localStorage.getItem("leetcode"));
        // localStorage.setItem("leetcode",JSON.stringify(JSON.parse(localStorage.getItem("leetcode")).push(userhandle)));
      }
      const username = `<p>Leetcode Username ${userhandle}</p>`;
      const ranking = `<p>Current Ranking ${data.ranking}</p>`;
      const problem_solved = `<p>Total Problem Solved ${data.totalSolved}</p>`;
      document
        .getElementById("details-container")
        .insertAdjacentHTML("beforeend", username + ranking + problem_solved);
    })
    .catch((err) => {
      alert(err);
    });
}

function getCodeforces() {
  let codeforces = document.getElementById("codeforces");
  const Codeforces_id = document.getElementById("codeforcesuser_id");
  userhandle = Codeforces_id.value;
  if (userhandle == "") {
    alert("Enter a valid username");
    return;
  }
  fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const username = `<p>Codeforces Username ${userhandle}</p>`;
      const rankingdata = `<p>Current Rating${data.result[0].rating}</p>`;

      document
        .getElementById("details-container")
        .insertAdjacentHTML("beforeend", username + rankingdata);
    });
}
