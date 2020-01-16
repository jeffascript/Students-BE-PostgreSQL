const express = require("express");
const db = require("../../db");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = "SELECT * FROM students"; //creating the first part of the query
  const limit = req.query.limit; //saving limit and offset
  const offset = req.query.offset;
  const sort = req.query.sort;

  delete req.query.limit; //removing them from the query
  delete req.query.offset;
  delete req.query.sort;

  const params = [limit, offset]; //initializing the parameters array

  let i = 0;
  for (var propName in req.query) {
    //for each extra query string parameter
    query += i === 0 ? " WHERE " : " AND "; //if it's the first, set the WHERE, else put the AND to join them
    query += propName + " = $" + (i + 3); // Add a property name followed by = $ number of the current param.
    //Since I already have $1 and $2 i must start from $3
    params.push(req.query[propName]); //I add the value of the query string param into the params array
    i++; //increment the index
  }

  if (sort) query += " ORDER BY _id " + (sort === "desc" ? "DESC" : "ASC");

  query += " LIMIT $1 OFFSET $2"; //closing up my query with limit and offset
  console.log(query);
  console.log(params);

  //

  //   res.status(200).send({
  //     totalCollectionCount: collection,
  //     allProducts,
  //     searchquery: `${req.protocol}://${req.get(
  //       "host"
  //     )}/products/?ObjProp=ObjValue&sort=QUERY_STRING&limit=NUMBER&skip=NUMBER`
  //   });

  //

  try {
    const students = await db.query(query, params);

    const allStudents = students.rows.map(p => {
      return {
        oneStudent: p,
        searchById: `${req.protocol}://${req.get("host")}/students/${p._id}`,
        searchByIdAndProjects: `${req.protocol}://${req.get("host")}/students/${p._id}/projects`,
        method: "GET"
      };
    });

    res.send({
      totalStudentsCount: students.rowCount,
      searchquery: `${req.protocol}://${req.get(
        "host"
      )}/students/?objProp=objValue&sort=Desc||Asc&limit=NUMBER&offset=NUMBER`,
      students: allStudents
      
    });
  } catch (ex) {
    res.status(500).send(ex);
  }
});

router.get("/search/:title", async (req, res) => {
  const result = await db.query("SELECT * FROM students WHERE Title LIKE $1", [
    "%" + req.params.title + "%"
  ]);

  res.send(result.rows);
});




router.get("/:id", async (req, res) => {
  try {
    //$1 will be replaced with the first element into the array passed as second parameter, in this case Asin = req.params.asin
    const students = await db.query(`SELECT * FROM students WHERE _id = $1`, [
      req.params.id
    ]);
    //If we get not row back, it means that we have no book which matches the condition
    if (students.rowCount === 0) return res.status(404).send("Not found");
    else return res.send(students.rows[0]);
  } catch (ex) {
    res.status(500).send(ex);
  }
});

// GET students/:id/projects => returns a list of projects in which also the info from the students appears (use JOIN to retrieve those info)

router.get("/:id/projects", async (req, res) => {
  try {
    const students = await db.query(
      `SELECT students._id,firstname,lastname,email,dob,projectname,description,createdat,repourl,liveurl   
                                    FROM students LEFT JOIN projects ON students._id = projects.studentid

  WHERE students._id = $1`,
      [req.params.id]
    );

    if (students.rowCount === 0) {
      res
        .status(404)
        .send(`The student with _id: ${req.params.id} NOT FOUND`);
    } else {
      res.send(students.rows);
    }
  } catch (error) {
    console.log(error);
  }
});




router.post("/", async (req, res) => {
  try {
    const result = await db.query(
      `INSERT INTO students (firstname, lastname, email, dob) 
                                     VALUES ($1,$2,$3,$4) 
                                     RETURNING *`,
      [req.body.firstname, req.body.lastname, req.body.email, req.body.dob]
    );

    res.send(result.rows[0]);
  } catch (ex) {
    res.status(500).send(ex);
    console.log(ex);
  }
});

//[EXTRA] POST /checkEmail => check if another student has the same email. The parameter should be passed in the body
// It should not be possible to add a new student if another has the same email. 
// This route should contact students' table querying them by email, if length of resulting array is > 0 then check should fail.

router.post("/checkEmail/", async(req,res)=>{
    

    try {

        const email = await db.query(
            `SELECT * FROM students WHERE email = $1`, [req.body.email]
        );
    
        if(email.rowCount > 0){
            console.log("one email",email)
            res.status(500).send("Email already in existence in Database");
        }

        else{
            const result = await db.query(
                `INSERT INTO students (firstname, lastname, email, dob) 
                                               VALUES ($1,$2,$3,$4) 
                                               RETURNING *`,
                [req.body.firstname, req.body.lastname, req.body.email, req.body.dob]
              );
          console.log("all", result.rows[0])
              res.send(result.rows[0]);

        }



      
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }

});



router.put("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE students 
                                    SET firstname = $1,
                                    lastname = $2,
                                    email= $3,
                                    dob= $4 
                                    WHERE _id = $5`,
      [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.dob,
        req.params.id
      ]
    );

    if (result.rowCount === 0) res.status(404).send("not found");
    else res.send("OK");
  } catch (ex) {
    res.status(500).send(ex);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(`DELETE FROM students WHERE _id = $1`, [
      req.params.id
    ]);

    if (result.rowCount === 0) res.status(404).send("not found");
    else res.send("OK");
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
