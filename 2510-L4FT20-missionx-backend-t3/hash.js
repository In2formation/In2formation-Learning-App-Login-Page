import bcrypt from "bcrypt";

async function run() {
  const hash = await bcrypt.hash("abc123", 10);
  console.log("HASH:", hash);
}

run();


//run: node hash.js in the terminal if you need to get the hash then put this into SQL:

//     UPDATE student
//     SET password = 'paste in new hashed password from the terminal then paste into SQL and execute'
//     WHERE student_id = (name which line to be updated);






