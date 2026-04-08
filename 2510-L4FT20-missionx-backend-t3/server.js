// IMPORTING LIBRARIES-express
import express from "express";
import dotenv from "dotenv";
import mysql2 from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from 'multer';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
});


//multer set up
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


//Test route
app.get("/", (req, res) => {
  //Using pool to run query and get the data
  pool.query("select * from student", (err, result) => {
    if (err) return res.json({ error: err });
    res.send(result);
  });
});



// Adrian's routes
// STUDENT LOGIN ROUTE
app.post("/student-login", async (req, res, next) => {
  console.log("Backend received:", req.body);
  const email = req.body.email;
  const password = req.body.password;
  pool.query(
    "SELECT * FROM student WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return next(err);
      if (result.length === 0) {
        return res.json({ success: false, message: "Invalid login" });
      }

      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        return res.json({ success: false, message: "Invalid login" });
      }

      return res.json({
        success: true,
        message: "Login successful",
        student: result[0],
      });
    }
  );
});

// STUDENT SIGNUP ROUTE
app.post("/student-signup", async (req, res, next) => {
  console.log("Backend received:", req.body);

  // Extract the data the frontend sent
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  // Hash the password before storing it. bcrypt.hash()
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    "INSERT INTO student (teacher_id, fullName, email, password) VALUES (1, ?, ?, ?)",
    [fullName, email, hashedPassword],
    (err, result) => {
      if (err) return res.json({ error: err });
      return res.json({
        success: true,
        studentId: result.insertId,
        message: "Signup successful",
      });
    }
  );
});
// TEACHER LOGIN ROUTE
// Same logic as student login, but checks the teacher table.
app.post("/teacher-login", async (req, res, next) => {
  console.log("Backend received:", req.body);

  const email = req.body.email;
  const password = req.body.password;

  pool.query(
    "SELECT * FROM teacher WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return next(err);
      if (result.length === 0) {
        return res.json({ success: false, message: "Invalid login" });
      }
      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        return res.json({ success: false, message: "Invalid login" });
      }
      return res.json({
        success: true,
        message: "Login successful",
        teacher: result[0],
      });
    }
  );
});

// TEACHER SIGNUP ROUTE
app.post("/teacher-signup", async (req, res, next) => {
  console.log("Backend received:", req.body);

  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query(
    "INSERT INTO teacher (fullName, email, password) VALUES (?, ?, ?)",
    [fullName, email, hashedPassword],
    (err, result) => {
      if (err) return next(err);
      return res.json({
        success: true,
        teacherId: result.insertId,
        message: "Signup successful",
      });
    }
  );
});

//❣️❣️❣️Amy's routes❣️❣️❣️
// POST submission - Updates existing row with static IDs
app.post('/api/projects/submit', upload.single('image'), (req, res) => {
    console.log('Received submission request');
    console.log('File:', req.file);

    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Build the URL path for the database
    const submissionUrl = `http://localhost:4000/uploads/${req.file.filename}`;

    // Simple UPDATE - static student_id = 1 and project_id = 1
    const query = "UPDATE student_projects SET date_submitted = NOW(), submission = ? WHERE student_id = 1 AND project_id = 1";
    
    pool.query(query, [submissionUrl], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: err.message });
        }

        console.log('Rows updated:', result.affectedRows);
        
        res.json({
            success: true,
            message: "Upload successful",
            filename: req.file.filename
        });
    });
});


// GET submissions - For teacher to view
app.get("/api/projects/submissions", (req, res) => {
    const query = `
        SELECT student_id, project_id, date_submitted, submission 
        FROM student_projects 
        WHERE submission IS NOT NULL
        ORDER BY date_submitted DESC
    `;
  
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, error: err.message });
        }
    
        const submissions = results.map(row => ({
            id: row.project_id,
            student_id: row.student_id,
            submission: row.submission,
            submitted_at: row.date_submitted
        }));
    
        res.json({ success: true, submissions: submissions });
    });
});

//download file API GET
app.get('/api/download', (req, res) => {
    const fileUrl = req.query.file;

    if (!fileUrl) {
        return res.status(400).send('No file specified');
    }

    // Convert URL → local file path
    // Example: /uploads/example.png
    const filePath = fileUrl.replace('http://localhost:4000', '');

    const absolutePath = `${process.cwd()}${filePath}`;

    res.download(absolutePath);
});
//WILLIAM'S ROUTES---------------------------------------------------------------------------------------------------

// API #1 PROJECTS + Optional Subscription Filter
// Example /projects    or  /projects?subscription=Free
app.get("/projects", (req, res) => {
  const { subscription } = req.query;

  let sql = "SELECT * FROM project";
  let params = [];

  if (subscription) {
    sql += " WHERE LOWER(subscription) = LOWER(?)";
    params.push(subscription.trim());
  }

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

//API #2 PROJECT NUMBER-------------------------------------------------------------------
// GET projects by id #  Example: projects/1  retrieves Project 1 data
app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;

  pool.query(
    "SELECT * FROM project WHERE project_id = ?",
    [projectId],
    (err, result) => {
      if (err) return res.json({ error: err });

      // Error Message e.g. project number doesn't exist etc Project not found
      if (result.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(result[0]);
    }
  );
});

//API #3 STUDENTS ID ----------------------------------------------------------------
//Filter projects by Student ID e.g. for Student Profile Viewer
// http://localhost:4000/students/1

app.get("/students/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM student WHERE student_id = ?",
    [id],
    (err, result) => {
      if (err) return res.json({ error: err });

      // Optional safety check
      if (result.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(result[0]);
    }
  );
});


//Jeremy's Routes



















// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err);
  if (err.code && err.code.startsWith("ER_")) {
    return res.status(500).json({
      success: false,
      message: "Database server error",
      error: err.code,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});








//DO NOT EDIT BELOW THIS LINE
//-------------------------------------------------------------------------------------------------------------


app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
