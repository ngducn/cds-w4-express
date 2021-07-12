const express = require("express");
const app = express();
const port = 5000;
const data = require('./data.json');

app.get("/", (req, res) => {
  res.send(data);
});

app.get("/companies", (req, res) => {
  let companies_list = []
  for (let idx in data.companies) {
    companies_list.push(data.companies[idx].name);
  }
  res.send(companies_list);
});

app.get("/jobs", (req, res) => {
  let jobs_list = []
  for (let idx in data.jobs) {
    jobs_list.push(data.jobs[idx].title);
  }

  if(req.query.order === "desc") {
    jobs_list = jobs_list.sort((a, b) => a - b);
  } 
  else if (req.query.order === "asc") {
    jobs_list = jobs_list.sort((a, b) => b - a);
  }
  else if (req.query.city === "San Francisco") {
    jobs_list = jobs_list.filter((job) => job.city === "San Francisco");
  }

  console.log(req.query)
  res.send(jobs_list);
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});