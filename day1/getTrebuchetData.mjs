import fs from "fs";

fs.readFile("./day1/input", (err, data) => {
  const input = data.toString();

  const output = input.split("\n").map((el) => el.match(/\d{1,2}/g));
  console.log(output);
});
