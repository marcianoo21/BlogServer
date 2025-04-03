// import express, { Request, Response } from "express";
// import bcrypt from 'bcryptjs';
// // import { createUser } from '../src/config/db';
// const app = express();
// const port = 3000;

// app.use(express.json())

// app.get("/start", (req: Request, res: Response) => {
//   res.status(200).send({
//     number: 3,
//     name: 'Aston'
//   });
// });

// app.post("/start/:no", (req: any, res: any) => {
//     const { no } = req.params;
//     const { club } = req.body;

//     if (!club) {
//       return res.status(422).send({ message: "You must provide the club name!" });
//     }

//     res.send(`Runner with ${no} number from ${club} club.`);
// });

// app.post('/register', async (req: any, res: any) => {
//   try {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password) {
//           return res.status(400).send({ message: "Name, email, and password are required" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log(`hash pass ${hashedPassword}`);

//        try {
//           const user = await createUser({ name, email, password: hashedPassword });
//         return res.status(201).send({
//             message: "User created successfully",
//             user: { id: user.id, name: user.name, email: user.email }
//           });
//         } catch (error: any) {
//           if (error.message && error.message.includes('already exists')) {
//             return res.status(409).send({ message: error.message });
//           }
//          if (error.code === '23505') { // PostgreSQL unique violation code
//             return res.status(409).send({ message: "User with this email already exists" });
//          }
//           throw error; 
//         }
//       } catch (error) {
//         console.error("Error in register endpoint:", error);
//         return res.status(500).send({ message: "Internal server error" });
//       }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });